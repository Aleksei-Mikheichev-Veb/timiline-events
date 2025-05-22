import React from 'react';
import styled from 'styled-components';
import Timeline from './components/Timeline/Timeline';
import GlobalStyle from './GlobalStyle';

// Периоды с событиями
const timelineData = {
    periods: [
        {
            id: 1,
            startYear: 1980,
            endYear: 1986,
            title: 'Музыка',
            events: [
                {
                    id: 1,
                    date: '1980',
                    description: 'Выпуск альбома «Back in Black» группы AC/DC, ставшего одним из самых продаваемых в истории.',
                },
                {
                    id: 2,
                    date: '1982',
                    description: 'Майкл Джексон выпускает альбом «Thriller», самый продаваемый альбом всех времён.',
                },
                {
                    id: 3,
                    date: '1983',
                    description: 'Телеканал MTV популяризирует музыкальные клипы, изменив музыкальную индустрию.',
                },
                {
                    id: 4,
                    date: '1984',
                    description: 'Мадонна выпускает альбом «Like a Virgin», определивший стиль поп-музыки эпохи.',
                },
                {
                    id: 5,
                    date: '1985',
                    description: 'Концерты Live Aid в Лондоне и Филадельфии собирают миллионы для помощи голодающим в Африке.',
                },
            ],
        },
        {
            id: 2,
            startYear: 1987,
            endYear: 1991,
            title: 'Кино',
            events: [
                {
                    id: 6,
                    date: '1987',
                    description: '«Хищник»/Predator, США (реж. Джон Мактирнан)',
                },
                {
                    id: 7,
                    date: '1988',
                    description: '«Кто подставил кролика Роджера»/Who Framed Roger Rabbit, США (реж. Роберт Земекис)',
                },
                {
                    id: 8,
                    date: '1989',
                    description: '«Назад в будущее 2»/Back To The Future 2, США (реж. Роберт Земекис)',
                },
                {
                    id: 9,
                    date: '1990',
                    description: '«Крепкий орешек 2»/Die Hard 2, США (реж. Ренни Харлин)',
                },
                {
                    id: 10,
                    date: '1991',
                    description: '«Семейка Аддамс»/The Addams Family, США (реж. Барри Зонненфельд)',
                },
            ],
        },
        {
            id: 3,
            startYear: 1992,
            endYear: 1997,
            title: 'Литература',
            events: [
                {
                    id: 11,
                    date: '1992',
                    description: 'Нобелевская премия по литературе — Дерек Уолкотт, «За блестящий образец карибского эпоса в 62 разделах»',
                },
                {
                    id: 12,
                    date: '1994',
                    description: '«Бессонница» — роман Стивена Кинга.',
                },
                {
                    id: 13,
                    date: '1995',
                    description: 'Нобелевская премия по литературе — Шеймас Хини.',
                },
                {
                    id: 14,
                    date: '1997',
                    description: '«Гарри Поттер и философский камень» — первая книга из серии Джоан Роулинг.',
                },
            ],
        },
        {
            id: 4,
            startYear: 1999,
            endYear: 2004,
            title: 'Театр',
            events: [
                {
                    id: 15,
                    date: '1999',
                    description: 'Премьера балета «Золушка» в постановке Жан-Кристофа Майо, сценография Эрнеста Пиньона.',
                },
                {
                    id: 16,
                    date: '2000',
                    description: 'Возобновлено издание журнала «Театр».',
                },
                {
                    id: 17,
                    date: '2002',
                    description: 'Премьера трилогии Тома Стоппарда «Берег Утопии», Королевский Национальный Театр, Лондон.',
                },
                {
                    id: 18,
                    date: '2003',
                    description: 'Состоялось торжественное открытие оперного театра «Ла Фениче» в Венеции.',
                },
            ],
        },
        {
            id: 5,
            startYear: 2005,
            endYear: 2014,
            title: 'Технологии',
            events: [
                {
                    id: 19,
                    date: '2005',
                    description: 'YouTube запущен как платформа для обмена видео.',
                },
                {
                    id: 20,
                    date: '2007',
                    description: 'Apple представляет первый iPhone, революционизирующий рынок смартфонов.',
                },
                {
                    id: 21,
                    date: '2009',
                    description: 'Bitcoin запущен Сатоши Накамото, положив начало криптовалютам.',
                },
                {
                    id: 22,
                    date: '2011',
                    description: 'Amazon выпускает Kindle Fire, популяризируя доступные планшеты.',
                },
                {
                    id: 23,
                    date: '2013',
                    description: 'Появление Oculus Rift, первого потребительского VR-шлема, открывает эру виртуальной реальности.',
                },
            ],
        },
        {
            id: 6,
            startYear: 2015,
            endYear: 2022,
            title: 'Наука',
            events: [
                {
                    id: 24,
                    date: '2015',
                    description: '13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды.',
                },
                {
                    id: 25,
                    date: '2016',
                    description: 'Телескоп «Хаббл» обнаружил самую удаленную из всех обнаруженных галактик, получившую обозначение GN-z11.',
                },
                {
                    id: 26,
                    date: '2017',
                    description: 'Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi.',
                },
                {
                    id: 27,
                    date: '2018',
                    description: 'Старт космического аппарата Solar Probe Plus, предназначенного для изучения Солнца.',
                },
                {
                    id: 28,
                    date: '2019',
                    description: 'Google объявил о создании 53-кубитного квантового компьютера.',
                },
                {
                    id: 29,
                    date: '2020',
                    description: 'Корабль Crew Dragon вернулся на Землю из первого пилотируемого полёта.',
                },
            ],
        },
    ],
};

const AppContainer = styled.div`
  max-width: 1440px;
  border: 1px solid rgba(66, 86, 122, 0.20);
  margin: 0 auto;
  padding: 0 20px 20px;
  background-color: #F4F5F9;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 1px;
    height: 100%;
    background: rgba(66, 86, 122, 0.20);
  }
  @media (max-width: 768px) {
    &:before {
      display: none;
  }
`;

const Title = styled.h1`
  position: relative;
  top: 80px;
  left: 58px;
  color: #42567A;
  font-size: 40px;
  
  &:before {
    content: '';
    position: absolute;
    top: 0px;
    left: -78px;
    height: 100%;
    width: 5px;
    background: linear-gradient(0deg, #EF5DA8 0%, #3877EE 100%);
  }
  @media (max-width: 1024px) {
    font-size: 35px;
    top: 50px;
    left: 28px;
    &:before {
      left: -48px;
      width: 4px;
    }
  }
  @media (max-width: 768px) {
    //font-size: 20px;
    top: 50px;
    left: 28px;
    &:before {
      display: none;
    }
    @media (max-width: 400px) {
    font-size: 20px;
      left: 0px;
  }
`;

const App: React.FC = () => {
    return (
        <>
            <GlobalStyle />
            <AppContainer>
                <Title>Исторические<br/> события</Title>
                <Timeline periods={timelineData.periods} />
            </AppContainer>
        </>
    );
};

export default App;


