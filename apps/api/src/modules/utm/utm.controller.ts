import { Body, Controller, Post } from '@nestjs/common';
import { UtmService } from './utm.service';
import { TrackUtmDto } from './dto/track-utm.dto';

@Controller('utm')
export class UtmController {
  constructor(private readonly utmService: UtmService) {}

  @Post('track')
  track(@Body() payload: TrackUtmDto) {
    return this.utmService.track(payload);
  }
}
