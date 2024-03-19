import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Relatórios')
@Controller('api/relatorios')
export class RelatorioController {}
