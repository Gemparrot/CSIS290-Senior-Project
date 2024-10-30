import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { TeamMemberService } from './team-members.service';
import { TeamMemberDto } from './team-members.dto';

@Controller('team-members')
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post()
  create(@Body() teamMemberDto: TeamMemberDto) {
    return this.teamMemberService.create(teamMemberDto);
  }

  @Get()
  findAll() {
    return this.teamMemberService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.teamMemberService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() teamMemberDto: TeamMemberDto,
  ) {
    return this.teamMemberService.update(id, teamMemberDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.teamMemberService.remove(id);
  }
}
