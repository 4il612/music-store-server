import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const start = async () => {
  try {
    const app = await NestFactory.create(AppModule)
    const PORT = process.env.PORT || 5000

    await app.listen(PORT, () => console.log(`Server started on: ${PORT}`))
  } catch (e){
    console.log(e);
    
  }
}

start()