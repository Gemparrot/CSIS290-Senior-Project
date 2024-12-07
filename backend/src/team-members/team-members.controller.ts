import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe, UnauthorizedException, Req, UseGuards } from '@nestjs/common';
import { TeamMemberService } from './team-members.service';
import { TeamMemberDto } from './team-members.dto';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { ExpressRequest } from '../shared/interfaces/express-request.interface';

@Controller('team-members')
@UseGuards(JwtAuthGuard)  
export class TeamMemberController {
  constructor(private readonly teamMemberService: TeamMemberService) {}

  @Post()
  async create(@Body() teamMemberDto: TeamMemberDto, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'admin') {
      throw new UnauthorizedException('Access restricted to admin users.');
    }
    return this.teamMemberService.create(teamMemberDto);
  }

  @Get()
  async findAll(@Req() req: ExpressRequest) {
    return this.teamMemberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'admin') {
      throw new UnauthorizedException('Access restricted to admin users.');
    }
    return this.teamMemberService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() teamMemberDto: TeamMemberDto,
    @Req() req: ExpressRequest,
  ) {
    if (req.user?.userType !== 'admin') {
      throw new UnauthorizedException('Access restricted to admin users.');
    }
    return this.teamMemberService.update(id, teamMemberDto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req: ExpressRequest) {
    if (req.user?.userType !== 'admin') {
      throw new UnauthorizedException('Access restricted to admin users.');
    }
    return this.teamMemberService.remove(id);
  }
}
