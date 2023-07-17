import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from './dto/projects.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtApplicantGuard } from 'src/jwt/guards/applicantjwt.guard';

@Controller('projects')
@ApiBearerAuth()
@UseGuards(JwtApplicantGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  
  @ApiTags("Project")
  @Post("addproject/:applicantId")
  addproject(@Param("applicantId") applicantId: string, @Body() projectDto: ProjectDto) {
    return this.projectsService.addProject(projectDto, applicantId);
  }

  @ApiTags("Project") 
  @Get("getproject/:applicantId")
  getproject(@Param("applicantId") applicantId: string) {
    return this.projectsService.getProject(applicantId);
  }
  
  @ApiTags("Project")
  @Patch("updproject/:projectId")
  updproject(@Param("projectId") projectId: string, @Body() updateEducationDto: UpdateProjectDto) {
    return this.projectsService.updProject(updateEducationDto, projectId);
  }

  @ApiTags("Project")
  @Delete("delproject/:projectId")
  delproject(@Param("projectId") projectId: string): any {
    return this.projectsService.delProject(projectId);
  }
}
