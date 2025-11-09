# Используем официальный образ Bun
FROM oven/bun:latest

# Создаём рабочую директорию
WORKDIR /app

# Копируем package.json, bun.lockb и tsconfig
COPY package.json bun.lockb tsconfig*.json ./

# Устанавливаем зависимости через Bun
RUN bun install

# Копируем весь проект
COPY . .

# Собираем NestJS проект
RUN bun run build

# Указываем порт (Koyeb использует переменную PORT)
ENV PORT 3000
EXPOSE 3000

# Старт приложения
CMD ["bun", "run", "start:prod"]