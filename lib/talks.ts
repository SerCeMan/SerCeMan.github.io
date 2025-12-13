export type Lang = 'en' | 'ru';

export type Event = {
  name: string;
  date: string;
  eventUrl?: string;
  recording?: string;
  slides?: string;
  repo?: string;
}

export type Talk = {
  language: Lang
  title: string;
  description: string;
  events: Event[]
}

export function getAllTalks(): Talk[] {
  return [
    {
      language: "en",
      title: "Collaborative Applications at Scale with RSocket",
      description: "At Canva, we enabled our users to collaborate with each other by introducing " +
        "services that support bidirectional streaming with RSocket. Building such a system is " +
        "difficult when the number of clients is large because every client must maintain a connection " +
        "to the backend service. The scaling and reliability considerations are significantly more complex " +
        "than a request-response based system.\n" +
        "\n" +
        "This talk discusses the challenges that we faced building these services, and the solutions we " +
        "came up with. The talk will go over the application challenges, including transport concerns, " +
        "client configuration, and observability, as well as the infrastructure challenges, including load " +
        "balancing and application configuration to support a large number of concurrent users.",
      events: [
        {
          name: "SpringOne",
          date: "2021-09-02",
          recording: "https://www.youtube.com/watch?v=2qiQJyOlAIY",
          slides: "https://www.slideshare.net/Pivotal/collaborative-applications-at-scale-with-rsocket"
        },
        {
          name: "Reactive Summit",
          date: "2021-10-02",
          eventUrl: "https://reactivesummit2021.sched.com/event/liIu/enabling-collaboration-with-realtime-services-at-scale-sergey-tselovalnikov-canva",
          recording: "https://www.youtube.com/watch?v=mUoiWuHJVLo"
        }
      ]
    },
    {
      language: "ru",
      title: "Построение сервисов с RSocket для взаимодействия в реальном времени",
      description: "В мире, где правит запрос/ответ, клиенты обычно инициируют взаимодействие, " +
        "тогда как в realtime мире бэкенд должен начать передачу данных, как только данные становятся д" +
        "оступны, не дожидаясь запросов от клиента. Построение таких систем нетривиально для сервисов с " +
        "большим количеством пользователей, ведь для каждого пользователя бэкэнду необходимо держать " +
        "открытое соединение и все связанные с ним данные. Вопросы масштабирования и отказоустойчивости " +
        "в случае realtime сервисов также сложнее обычных REST сервисов.\n" +
        "\n" +
        "В Canva мы сделали возможным для наших пользователей взаимодействовать друг другом в реальном времени, " +
        "построив сервис с помощью RSocket. В этом докладе я опишу, как мы строили сервис, проблемы, с которыми " +
        "мы столкнулись и сопутствующие решения как с точки зрения кода — использование RSocket на бэкенде и " +
        "фронтенде, backpressure, мониторинг и отладка, так и с точки зрения инфраструктуры.",
      events: [{
        name: "SnowOne",
        date: "2021-02-26",
        eventUrl: "https://jugspeakers.info/ru/information/talks/talk/2897",
        recording: "https://www.youtube.com/watch?v=n2-10ZVXVes",
      }]
    },
    {
      language: "ru",
      title: "Workshop: Build Bomberman with RSocket\n(Oleh Dokuka & Sergey Tselovalnikov)",
      description: "The workshop is aimed at developers of microservices and distributed systems who are interested " +
        "in getting to know RSocket-Java and RSocket-JS closely in practice, trying different features of these " +
        "technologies, and understanding their use for building fast and fault-tolerant systems.\n" +
        "\n" +
        "In this workshop, you will encounter RSocket-JS on the browser side and develop some of the logic related to " +
        "interacting with remote players, as well as an intermediate server. You will also create a clustering and " +
        "sharding mechanism that allows players to connect in the same game space. You will have the opportunity to " +
        "evaluate the possibility of changing transport to achieve more efficient interaction between the " +
        "client-server and the server-server.",
      events: [{
        name: "JPoint",
        date: "2021-04-13",
        eventUrl: "https://jpoint.ru/en/archive/2021/talks/fmgsduk8i8ukgntigxna7/",
        recording: "https://www.youtube.com/watch?v=hF5pj9fmWOQ",
        repo: "https://github.com/rsocket/bomberman-workshop",
      }]
    },
    {
      language: "en",
      title: "Why we should care about clocks",
      description: "As software developers, each of us relies on the notion of time: a crucial " +
        "concept in ensuring that events in our programs follow a chronological order. Yet, invoking " +
        "a simple call to “get the current time” can potentially yield unexpected results and lead to " +
        "unforeseen consequences if not used correctly. Moreover, the invariants about time we observe " +
        "on our local development machine may not necessarily hold in the cloud, or in any distributed system. \n" +
        "\n" +
        "In this talk, I’ll go through the different ways we can obtain the current time in our programs, and " +
        "present cases where our intuitions and expectations of time from these clocks may mislead us, at best, " +
        "and cause unintended errors at best or catastrophic failures, at worst.\n",
      events: [{
        name: "Melbourne Java & JVM Users Group",
        date: "2018-12-05",
        eventUrl: "https://www.meetup.com/melbourne-java-jvm-users-group/events/256192963/",
        slides: "https://www.dropbox.com/s/umpe7kefbxp6i2t/The%20matter%20of%20time.pdf?dl=0"
      }]
    },
    {
      language: "en",
      title: "Distributed Tracing - Know Your Enemy",
      description: "Modern web applications consist of multiple services often deployed on hundreds " +
        "of different machines. This allows them to be scalable, evolve quickly, deploy often. However, " +
        "these distributed architectures contain new challenges for debugging. Luckily for us, there is " +
        "a solution - distributed tracing. In this talk, I'll go through the experience of integrating " +
        "distributed tracing at Canva, the decisions we made and the challenges we faced.",
      events: [{
        name: "Sydney Kotlin Meetup",
        date: "2018-06-27",
        eventUrl: "https://web.archive.org/web/20240415195555/https://sydspace.org/events#kotlin-june-2018",
        slides: "/talk-resources/distributed-tracing/distributed-tracing.pdf",
      }]
    },
    {
      language: "en",
      title: "Fantastic DSLs and Where to Find Them",
      description: "Kotlin is a very rich language. Unlike many other languages, it allows building " +
        "another language inside itself. For example, mimic HTML syntax or construct completely typed " +
        "SQL query. But Kotlin's power isn't limited to simple DSLs. With some Kotlin-fu, it's possible " +
        "to write a DSL that allows working on untyped data structures in a typed manner. In this talk, " +
        "we'll go through different ways to define a DSL in Kotlin, from very simple to fantastically powerful.",
      events: [{
        name: "Kotlin Night Sydney",
        date: "2017-07-14",
        eventUrl: "https://web.archive.org/web/20240415195555/https://sydspace.org/events#kotlin-night-2017",
        recording: "https://www.youtube.com/watch?v=ua6mZxNoCcY",
      }]
    },
    {
      language: "ru",
      title: "Как не наступить на грабли, внедряя скрипты в java приложение",
      description: "Однажды вы решаете добавить динамики приложению и в вашем Java коде появляется Groovy, " +
        "либо любой другой скриптовый язык. И Groovy приносит свою магию.\n" +
        "Сначала её мало, но затем её становится все больше и больше! Вместе " +
        "со скриптами появляется много вопросов - а если?, а как?, а почему?" +
        "Я расскажу как сделать так, чтобы написание скриптов приносило радость, " +
        "их поддержка не была болью, а Groovy стал вашим лучшим другом!",
      events: [{
        name: "JUG.EKB #1",
        date: "2014-05-15",
        eventUrl: "https://web.archive.org/web/20220314164746/https://jugekb.ru/",
        recording: "https://www.youtube.com/watch?v=ShjuZLumSJ0"
      }]
    }
  ];
}
