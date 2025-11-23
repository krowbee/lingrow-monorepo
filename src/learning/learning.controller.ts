import { Controller, Get } from '@nestjs/common';
import { AuthOnly } from 'src/auth/auth.decorators';

@Controller('learning')
export class LearningController {}
