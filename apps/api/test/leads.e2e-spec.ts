import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';

process.env.NODE_ENV = 'test';
process.env.AUTOMATIONS_DISABLED = 'true';

describe('Leads (e2e)', () => {
  let app: INestApplication;
  let AppModuleRef: any;

  beforeAll(async () => {
    AppModuleRef = (await import('../src/app.module')).AppModule;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModuleRef],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create, read and delete a lead', async () => {
    const email = `e2e-${Date.now()}@example.com`;

    const createResponse = await request(app.getHttpServer())
      .post('/api/leads')
      .send({
        name: 'E2E Lead',
        email,
        phone: '+5511999999999',
        source: 'e2e-test',
      })
      .expect(201);

    expect(createResponse.body).toHaveProperty('id');
    const leadId = createResponse.body.id as string;

    await request(app.getHttpServer()).get(`/api/leads/${leadId}`).expect(200);
    await request(app.getHttpServer()).delete(`/api/leads/${leadId}`).expect(200);
  });
});
