import { Test, TestingModule } from '@nestjs/testing';
import { VoiceOptimizationService } from './voice-optimization.service';

describe('VoiceOptimizationService', () => {
  let service: VoiceOptimizationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VoiceOptimizationService],
    }).compile();

    service = module.get<VoiceOptimizationService>(VoiceOptimizationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
