import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

interface App {
  listen(): void;
  close(): void;
}

// GraphQL Response Type
interface GraphQLResponse {
  data?: {
    tasks?: Array<{
      id: string;
      title: string;
      completed: boolean;
    }>;
  };
  errors?: Array<{
    message: string;
    extensions?: Record<string, unknown>;
  }>;
}

describe('GraphQL API E2E Tests', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should return GraphQL playground response', async () => {
    const query = `
      query {
        tasks {
          id
          title
          completed
        }
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200)
      .expect((res: { body: GraphQLResponse }) => {
        expect(res.body.data).toBeDefined();
        expect(res.body.errors).toBeUndefined();
        expect(Array.isArray(res.body.data?.tasks)).toBe(true);
      });
  });

  it('should return 400 for invalid GraphQL query', async () => {
    const invalidQuery = `
      query {
        invalidField
      }
    `;

    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: invalidQuery })
      .expect(400)
      .expect((res: { body: GraphQLResponse }) => {
        expect(res.body.errors).toBeDefined();
        expect(Array.isArray(res.body.errors)).toBe(true);
      });
  });
});
