import { Test, TestingModule } from '@nestjs/testing';
import { MagentaMomentsController } from './magenta-moments.controller';

describe('MagentaMomentsController', () => {
  let controller: MagentaMomentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MagentaMomentsController],
    }).compile();

    controller = module.get<MagentaMomentsController>(MagentaMomentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
