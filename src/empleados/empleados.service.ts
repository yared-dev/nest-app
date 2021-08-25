import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Employe } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEmployeDto, EditEmployeDto } from './dto';

@Injectable()
export class EmpleadosService {
  constructor(
    @InjectRepository(Employe)
    private readonly employeRepository: Repository<Employe>,
  ) {}

  async getMany() {
    return await this.employeRepository.find();
  }

  async getById(id: number) {
    const employed = await this.employeRepository.findOne(id);
    if (!employed)
      throw new NotFoundException('employed does not exist or unauthorized');
    return employed;
  }

  async createOne(dto: CreateEmployeDto) {
    const employeExist = await this.employeRepository.findOne({ dni: dto.dni });
    if (employeExist)
      throw new BadRequestException('employed already registered with dni');

    const newEmploye = this.employeRepository.create(dto);
    const employed = await this.employeRepository.save(newEmploye);
    return employed;
  }

  async editOne(id: number, dto: EditEmployeDto) {
    const employed = await this.getById(id);
    const editedEmployed = Object.assign(employed, dto);
    return await this.employeRepository.save(editedEmployed);
  }

  async deleteOne(id: number) {
    const employed = await this.getById(id);
    return await this.employeRepository.remove(employed);
  }
}
