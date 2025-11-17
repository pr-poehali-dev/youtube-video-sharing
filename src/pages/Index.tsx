import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: string;
  channelAvatar: string;
  views: string;
  uploadedAt: string;
  duration: string;
  category: string;
  youtubeId: string;
}

const MOCK_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Космос: Путешествие за пределы Солнечной системы',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    channel: 'Space Explorers',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SE',
    views: '2.3M',
    uploadedAt: '2 дня назад',
    duration: '15:24',
    category: 'Наука',
    youtubeId: 'dQw4w9WgXcQ'
  },
  {
    id: '2',
    title: 'Как работает квантовый компьютер',
    thumbnail: 'https://img.youtube.com/vi/JhHMJCUmq28/maxresdefault.jpg',
    channel: 'Tech Explained',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TE',
    views: '1.5M',
    uploadedAt: '1 неделю назад',
    duration: '22:15',
    category: 'Технологии',
    youtubeId: 'JhHMJCUmq28'
  },
  {
    id: '3',
    title: 'Лучшие моменты футбольного сезона 2024',
    thumbnail: 'https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg',
    channel: 'Sports Daily',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=SD',
    views: '890K',
    uploadedAt: '3 дня назад',
    duration: '18:42',
    category: 'Спорт',
    youtubeId: '3JZ_D3ELwOQ'
  },
  {
    id: '4',
    title: 'Рецепт идеальной пиццы за 30 минут',
    thumbnail: 'https://img.youtube.com/vi/sv3TXMSv6Lw/maxresdefault.jpg',
    channel: 'Вкусная кухня',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=VK',
    views: '650K',
    uploadedAt: '5 дней назад',
    duration: '12:33',
    category: 'Кулинария',
    youtubeId: 'sv3TXMSv6Lw'
  },
  {
    id: '5',
    title: 'История великих открытий: От колеса до ИИ',
    thumbnail: 'https://img.youtube.com/vi/FTQbiNvZqaY/maxresdefault.jpg',
    channel: 'История Мира',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=HM',
    views: '1.2M',
    uploadedAt: '2 недели назад',
    duration: '45:18',
    category: 'Образование',
    youtubeId: 'FTQbiNvZqaY'
  },
  {
    id: '6',
    title: 'Тренировка для начинающих: 20 минут в день',
    thumbnail: 'https://img.youtube.com/vi/gC_L9qAHVJ8/maxresdefault.jpg',
    channel: 'Fitness Pro',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=FP',
    views: '420K',
    uploadedAt: '4 дня назад',
    duration: '20:00',
    category: 'Спорт',
    youtubeId: 'gC_L9qAHVJ8'
  },
  {
    id: '7',
    title: 'Путешествие по Японии: Токио и Киото',
    thumbnail: 'https://img.youtube.com/vi/ykLgjhBnik0/maxresdefault.jpg',
    channel: 'Travel Vlog',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TV',
    views: '780K',
    uploadedAt: '1 неделю назад',
    duration: '28:45',
    category: 'Путешествия',
    youtubeId: 'ykLgjhBnik0'
  },
  {
    id: '8',
    title: 'Обзор новых технологий 2024',
    thumbnail: 'https://img.youtube.com/vi/ZZ5LpwO-An4/maxresdefault.jpg',
    channel: 'Tech Review',
    channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=TR',
    views: '1.8M',
    uploadedAt: '3 дня назад',
    duration: '16:30',
    category: 'Технологии',
    youtubeId: 'ZZ5LpwO-An4'
  }
];

const CATEGORIES = ['Все', 'Наука', 'Технологии', 'Спорт', 'Кулинария', 'Образование', 'Путешествия'];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const filteredVideos = MOCK_VIDEOS.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sidebarItems = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'favorites', icon: 'Heart', label: 'Избранное' },
    { id: 'playlists', icon: 'List', label: 'Плейлисты' },
    { id: 'categories', icon: 'Grid', label: 'Категории' },
    { id: 'search', icon: 'Search', label: 'Поиск' },
    { id: 'about', icon: 'User', label: 'Обо мне' }
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <aside 
        className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-sidebar border-r border-sidebar-border transition-all duration-300 flex flex-col fixed lg:relative h-full z-30`}
      >
        <div className="p-4 flex items-center justify-between border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Play" size={20} className="text-primary-foreground" />
            </div>
            {sidebarOpen && <span className="font-bold text-lg">MyTube</span>}
          </div>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-sidebar-accent rounded-lg transition-colors"
          >
            <Icon name="Menu" size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {sidebarItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground' 
                  : 'hover:bg-sidebar-accent/50 text-sidebar-foreground'
              }`}
            >
              <Icon name={item.icon as any} size={20} />
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
      </aside>

      <main className={`flex-1 flex flex-col overflow-hidden ${!sidebarOpen ? 'lg:ml-0' : ''}`}>
        <header className="h-14 border-b border-border bg-card px-6 flex items-center gap-4">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск видео..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary border-0 focus-visible:ring-1"
              />
            </div>
          </div>
          
          <button className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Icon name="Bell" size={20} />
          </button>
          
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </header>

        <div className="px-6 py-3 border-b border-border bg-card overflow-x-auto">
          <div className="flex gap-2">
            {CATEGORIES.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? 'default' : 'secondary'}
                className="cursor-pointer whitespace-nowrap px-4 py-2 hover:bg-secondary/80 transition-colors"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {activeSection === 'home' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredVideos.map(video => (
                <div 
                  key={video.id} 
                  className="group cursor-pointer animate-fade-in"
                >
                  <div className="relative rounded-xl overflow-hidden bg-card mb-3 aspect-video">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-0.5 rounded text-xs font-medium">
                      {video.duration}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Avatar className="h-9 w-9 flex-shrink-0">
                      <AvatarImage src={video.channelAvatar} />
                      <AvatarFallback>{video.channel[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{video.channel}</p>
                      <p className="text-xs text-muted-foreground">
                        {video.views} просмотров • {video.uploadedAt}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'favorites' && (
            <div className="text-center py-20">
              <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Избранное пусто</h2>
              <p className="text-muted-foreground">Добавьте видео в избранное, чтобы они появились здесь</p>
            </div>
          )}

          {activeSection === 'playlists' && (
            <div className="text-center py-20">
              <Icon name="List" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Нет плейлистов</h2>
              <p className="text-muted-foreground">Создайте свой первый плейлист</p>
            </div>
          )}

          {activeSection === 'categories' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {CATEGORIES.filter(c => c !== 'Все').map(category => (
                <div 
                  key={category}
                  className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors cursor-pointer group"
                  onClick={() => {
                    setSelectedCategory(category);
                    setActiveSection('home');
                  }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <Icon name="Folder" size={24} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{category}</h3>
                  <p className="text-sm text-muted-foreground">
                    {MOCK_VIDEOS.filter(v => v.category === category).length} видео
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'search' && (
            <div className="text-center py-20">
              <Icon name="Search" size={64} className="mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-bold mb-2">Поиск видео</h2>
              <p className="text-muted-foreground">Используйте строку поиска выше для поиска видео</p>
            </div>
          )}

          {activeSection === 'about' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-card p-8 rounded-xl border border-border">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="https://api.dicebear.com/7.x/initials/svg?seed=User" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-2xl font-bold mb-1">Мой канал</h2>
                    <p className="text-muted-foreground">Коллекция моих любимых видео</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">О канале</h3>
                    <p className="text-muted-foreground">
                      Здесь я собираю самые интересные и полезные видео из YouTube. 
                      От научных открытий до кулинарных рецептов!
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{MOCK_VIDEOS.length}</div>
                      <div className="text-sm text-muted-foreground">Видео</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Плейлистов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">0</div>
                      <div className="text-sm text-muted-foreground">Избранное</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
