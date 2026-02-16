import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CourseService } from './course.service';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger';
import { CourseDto, CreateCourseDto, UpdateCourseDto } from './course.dto';
import { AdminOnly } from 'src/domains/auth/decorators/auth.decorators';
import { PublicLessonDto } from '../lesson/lesson.dto';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @ApiOperation({
    summary: 'Get list of courses',
    description: 'Returns list of courses',
  })
  @ApiOkResponse({ type: [CourseDto] })
  @Get('/')
  async getCoursesList() {
    const courses = await this.courseService.getCoursesList();
    return { courses };
  }

  @ApiOperation({
    summary: 'Get lessons by course slug (AuthOnly)',
    description: 'Returns list of lessons of particular course',
  })
  @ApiOkResponse({ type: [PublicLessonDto] })
  @ApiParam({ name: 'courseSlug', type: String, description: "Course's slug" })
  @Get('/:courseSlug/lessons')
  async getLesson(@Param('courseSlug') slug: string) {
    const lessons = await this.courseService.getLessonsByCourseSlug(slug);
    return { lessons };
  }

  @ApiOperation({
    summary: 'Create course (AdminOnly)',
    description: 'Return course object',
  })
  @ApiOkResponse({ type: CourseDto })
  @ApiBody({ type: CreateCourseDto })
  @AdminOnly()
  @Post('/')
  async createCourse(@Body() data: CreateCourseDto) {
    const course = await this.courseService.createCourse(data);
    return course;
  }

  @ApiOperation({
    summary: 'Update course (AdminOnly)',
    description: 'Return course object',
  })
  @ApiOkResponse({ type: CourseDto })
  @ApiParam({ type: Number, name: 'courseId' })
  @ApiBody({ type: UpdateCourseDto })
  @AdminOnly()
  @Patch('/:courseId')
  async updateCourse(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() data: UpdateCourseDto,
  ) {
    const course = await this.courseService.updateCourse(data, courseId);
    return course;
  }

  @ApiOperation({
    summary: 'Delete course (AdminOnly)',
    description: 'Return the deleted course object',
  })
  @ApiParam({ type: Number, name: 'courseId' })
  @ApiOkResponse({ type: CourseDto })
  @AdminOnly()
  @Delete('/:courseId')
  async deleteCourse(@Param('courseId', ParseIntPipe) courseId: number) {
    const course = await this.courseService.deleteCourse(courseId);
    return course;
  }
}
