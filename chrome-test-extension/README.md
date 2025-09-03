# Минимальное расширение Chrome (Manifest V3)

## Установка (Load unpacked)
1. Откройте `chrome://extensions/`.
2. Включите **Developer mode** (Режим разработчика).
3. Нажмите **Load unpacked** (Загрузить распакованное).
4. Выберите папку `chrome-test-extension` из этого проекта.

## Проверка работы
- Откройте карточку расширения и нажмите **Service worker** (или **background page**) — откроется консоль.
- В консоли должен появиться лог: `Extension loaded`.

Готово. Расширение можно тестировать локально в Chrome или Edge.
