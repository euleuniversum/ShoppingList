# ShoppingList

Создать возможность записать список покупок и выгрузить его в формате csv (или tsv). Это тот список, который предполагается заполнять по мере вспоминания, а не при подготовке к походу в магазин.

Что должно уметь приложение:
Форма добавления элемента списка
Название элемента
Количество (с возможностью выбрать единицу измерения: штуки, граммы, мл) — необязательный пункт в форме
Примерная цена — необязательный пункт в форме
* Единица измерения цены (за штуку, за кг, за всю позицию)
Где купить — необязательный пункт в форме
* Список замен, если не найдется оригинальный товар 
Таблица с уже имеющимися элементами списка
Таблицу должно быть можно отфильтровать по месту покупки — в интерфейсе должны быть показать все варианты, указанные в полях «где купить», и должна быть возможность выбрать для показывания одно или несколько мест
Должна быть возможность отсортировать элементы по дате добавления, по цене или по названию
* Должна быть указана сумма всех позиций в списке с учетом единицы измерения цены
Редактирование элемента списка
Удаление элемента списка
*Возможность отметить что-то купленным не удаляя из списка — где то будет храниться список всего купленного, чтобы можно было вернуть элемент обратно в список, когда он снова понадобится
*Кнопка с выгрузкой списка с примененными фильтрами и сортировками в файл с форматом .csv или .tsv (comma separated values или tab separated values)
