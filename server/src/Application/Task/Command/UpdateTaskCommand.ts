import {ApiModelProperty} from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {ICommand} from 'src/Application/ICommand';

export class UpdateTaskCommand implements ICommand {
  @ApiModelProperty()
  @IsNotEmpty()
  public name: string;
  public id: string;
}
