import {
  Body,
  Post,
  Controller,
  Inject,
  BadRequestException,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { CreateTaskCommand } from 'src/Application/Task/Command/CreateTaskCommand';
import { ICommandBus } from 'src/Application/ICommandBus';
import { TaskDTO } from '../DTO/TaskDTO';
import { Roles } from 'src/Infrastructure/HumanResource/User/Decorator/Roles';
import { UserRole } from 'src/Domain/HumanResource/User/User.entity';
import { RolesGuard } from 'src/Infrastructure/HumanResource/User/Security/RolesGuard';

@Controller('tasks')
@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(AuthGuard('bearer'), RolesGuard)
export class CreateTaskAction {
  constructor(
    @Inject('ICommandBus')
    private readonly commandBus: ICommandBus
  ) {}

  @Post()
  @Roles(UserRole.COOPERATOR, UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Create new task' })
  public async index(@Body() taskDto: TaskDTO) {
    try {
      const id = await this.commandBus.execute(
        new CreateTaskCommand(taskDto.name)
      );

      return { id };
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }
}
