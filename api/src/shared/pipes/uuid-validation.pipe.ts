import { Injectable, PipeTransform } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { isValidUUID } from '../utils/uuid.util';

@Injectable()
export class UUIDValidationPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!isValidUUID(value)) {
      throw new BadRequestException('Invalid UUID format');
    }
    return value;
  }
}
