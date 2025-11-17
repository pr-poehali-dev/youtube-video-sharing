import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

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

interface Playlist {
  id: string;
  name: string;
  videos: Video[];
  createdAt: string;
}

const INITIAL_VIDEOS: Video[] = [
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
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [favorites, setFavorites] = useState<Video[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [showAddVideoDialog, setShowAddVideoDialog] = useState(false);
  const [showCreatePlaylistDialog, setShowCreatePlaylistDialog] = useState(false);
  const [showAddToPlaylistDialog, setShowAddToPlaylistDialog] = useState(false);
  const [videoToAddToPlaylist, setVideoToAddToPlaylist] = useState<Video | null>(null);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [allVideos, setAllVideos] = useState<Video[]>(INITIAL_VIDEOS);
  const { toast } = useToast();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    const savedPlaylists = localStorage.getItem('playlists');
    const savedVideos = localStorage.getItem('allVideos');
    
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedPlaylists) setPlaylists(JSON.parse(savedPlaylists));
    if (savedVideos) setAllVideos(JSON.parse(savedVideos));
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('playlists', JSON.stringify(playlists));
  }, [playlists]);

  useEffect(() => {
    localStorage.setItem('allVideos', JSON.stringify(allVideos));
  }, [allVideos]);

  const extractYouTubeId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/,
      /youtube\.com\/embed\/([^&\s]+)/,
      /youtube\.com\/v\/([^&\s]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const addVideoFromUrl = () => {
    const youtubeId = extractYouTubeId(newVideoUrl);
    
    if (!youtubeId) {
      toast({
        title: "Ошибка",
        description: "Неверная ссылка на YouTube видео",
        variant: "destructive"
      });
      return;
    }

    const newVideo: Video = {
      id: Date.now().toString(),
      title: 'Новое видео',
      thumbnail: `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`,
      channel: 'YouTube',
      channelAvatar: 'https://api.dicebear.com/7.x/initials/svg?seed=YT',
      views: '0',
      uploadedAt: 'Только что',
      duration: '0:00',
      category: 'Разное',
      youtubeId
    };

    setAllVideos([newVideo, ...allVideos]);
    setNewVideoUrl('');
    setShowAddVideoDialog(false);
    
    toast({
      title: "Успех!",
      description: "Видео добавлено в коллекцию"
    });
  };

  const toggleFavorite = (video: Video) => {
    const isFavorite = favorites.some(fav => fav.id === video.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== video.id));
      toast({ description: "Удалено из избранного" });
    } else {
      setFavorites([...favorites, video]);
      toast({ description: "Добавлено в избранное" });
    }
  };

  const createPlaylist = () => {
    if (!newPlaylistName.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название плейлиста",
        variant: "destructive"
      });
      return;
    }

    const newPlaylist: Playlist = {
      id: Date.now().toString(),
      name: newPlaylistName,
      videos: [],
      createdAt: new Date().toISOString()
    };

    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName('');
    setShowCreatePlaylistDialog(false);
    
    toast({
      title: "Успех!",
      description: `Плейлист "${newPlaylistName}" создан`
    });
  };

  const addToPlaylist = (playlistId: string) => {
    if (!videoToAddToPlaylist) return;

    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        const videoExists = playlist.videos.some(v => v.id === videoToAddToPlaylist.id);
        if (videoExists) {
          toast({
            description: "Видео уже в плейлисте",
            variant: "destructive"
          });
          return playlist;
        }
        
        toast({
          description: `Добавлено в "${playlist.name}"`
        });
        
        return {
          ...playlist,
          videos: [...playlist.videos, videoToAddToPlaylist]
        };
      }
      return playlist;
    }));

    setShowAddToPlaylistDialog(false);
    setVideoToAddToPlaylist(null);
  };

  const removeFromPlaylist = (playlistId: string, videoId: string) => {
    setPlaylists(playlists.map(playlist => {
      if (playlist.id === playlistId) {
        return {
          ...playlist,
          videos: playlist.videos.filter(v => v.id !== videoId)
        };
      }
      return playlist;
    }));
    
    toast({ description: "Видео удалено из плейлиста" });
  };

  const deletePlaylist = (playlistId: string) => {
    setPlaylists(playlists.filter(p => p.id !== playlistId));
    toast({ description: "Плейлист удален" });
  };

  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.channel.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Все' || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sidebarItems = [
    { id: 'home', icon: 'Home', label: 'Главная' },
    { id: 'favorites', icon: 'Heart', label: 'Избранное', count: favorites.length },
    { id: 'playlists', icon: 'List', label: 'Плейлисты', count: playlists.length },
    { id: 'categories', icon: 'Grid', label: 'Категории' },
    { id: 'about', icon: 'User', label: 'Обо мне' }
  ];

  const VideoCard = ({ video, onAddToPlaylist }: { video: Video; onAddToPlaylist?: () => void }) => {
    const isFavorite = favorites.some(fav => fav.id === video.id);
    
    return (
      <div className="group cursor-pointer animate-fade-in">
        <div 
          className="relative rounded-xl overflow-hidden bg-card mb-3 aspect-video"
          onClick={() => setSelectedVideo(video)}
        >
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
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(video);
              }}
              className="p-2 bg-black/80 rounded-full hover:bg-black/90 transition-colors"
            >
              <Icon 
                name={isFavorite ? "Heart" : "Heart"} 
                size={18} 
                className={isFavorite ? "fill-primary text-primary" : "text-white"}
              />
            </button>
            {onAddToPlaylist && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToPlaylist();
                }}
                className="p-2 bg-black/80 rounded-full hover:bg-black/90 transition-colors"
              >
                <Icon name="Plus" size={18} className="text-white" />
              </button>
            )}
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
    );
  };

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
              {sidebarOpen && (
                <div className="flex items-center justify-between flex-1">
                  <span className="font-medium">{item.label}</span>
                  {item.count !== undefined && item.count > 0 && (
                    <Badge variant="secondary" className="ml-auto text-xs">
                      {item.count}
                    </Badge>
                  )}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <Button
            onClick={() => setShowAddVideoDialog(true)}
            className="w-full"
            variant="default"
          >
            <Icon name="Plus" size={18} className="mr-2" />
            {sidebarOpen && 'Добавить видео'}
          </Button>
        </div>
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
                <VideoCard 
                  key={video.id} 
                  video={video}
                  onAddToPlaylist={() => {
                    setVideoToAddToPlaylist(video);
                    setShowAddToPlaylistDialog(true);
                  }}
                />
              ))}
            </div>
          )}

          {activeSection === 'favorites' && (
            <div>
              {favorites.length === 0 ? (
                <div className="text-center py-20">
                  <Icon name="Heart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-bold mb-2">Избранное пусто</h2>
                  <p className="text-muted-foreground">Добавьте видео в избранное, чтобы они появились здесь</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {favorites.map(video => (
                    <VideoCard 
                      key={video.id} 
                      video={video}
                      onAddToPlaylist={() => {
                        setVideoToAddToPlaylist(video);
                        setShowAddToPlaylistDialog(true);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeSection === 'playlists' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Мои плейлисты</h2>
                <Button onClick={() => setShowCreatePlaylistDialog(true)}>
                  <Icon name="Plus" size={18} className="mr-2" />
                  Создать плейлист
                </Button>
              </div>
              
              {playlists.length === 0 ? (
                <div className="text-center py-20">
                  <Icon name="List" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-bold mb-2">Нет плейлистов</h2>
                  <p className="text-muted-foreground mb-4">Создайте свой первый плейлист</p>
                  <Button onClick={() => setShowCreatePlaylistDialog(true)}>
                    Создать плейлист
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {playlists.map(playlist => (
                    <Card key={playlist.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon name="List" size={24} className="text-primary" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold">{playlist.name}</h3>
                              <p className="text-sm text-muted-foreground">
                                {playlist.videos.length} видео
                              </p>
                            </div>
                          </div>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deletePlaylist(playlist.id)}
                          >
                            <Icon name="Trash" size={16} className="mr-2" />
                            Удалить
                          </Button>
                        </div>
                        
                        {playlist.videos.length === 0 ? (
                          <p className="text-muted-foreground text-center py-4">
                            Плейлист пуст. Добавьте видео через кнопку "+" на карточке видео.
                          </p>
                        ) : (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {playlist.videos.map(video => (
                              <div key={video.id} className="relative">
                                <VideoCard video={video} />
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="absolute top-2 left-2"
                                  onClick={() => removeFromPlaylist(playlist.id, video.id)}
                                >
                                  <Icon name="X" size={14} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
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
                    {allVideos.filter(v => v.category === category).length} видео
                  </p>
                </div>
              ))}
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
                      <div className="text-2xl font-bold text-primary">{allVideos.length}</div>
                      <div className="text-sm text-muted-foreground">Видео</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{playlists.length}</div>
                      <div className="text-sm text-muted-foreground">Плейлистов</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{favorites.length}</div>
                      <div className="text-sm text-muted-foreground">Избранное</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Dialog open={!!selectedVideo} onOpenChange={() => setSelectedVideo(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] p-0">
          {selectedVideo && (
            <div className="flex flex-col h-full">
              <div className="aspect-video bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-2">{selectedVideo.title}</h2>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={selectedVideo.channelAvatar} />
                      <AvatarFallback>{selectedVideo.channel[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedVideo.channel}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedVideo.views} просмотров • {selectedVideo.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto flex gap-2">
                    <Button
                      variant={favorites.some(f => f.id === selectedVideo.id) ? "default" : "secondary"}
                      onClick={() => toggleFavorite(selectedVideo)}
                    >
                      <Icon name="Heart" size={18} className="mr-2" />
                      {favorites.some(f => f.id === selectedVideo.id) ? 'В избранном' : 'В избранное'}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setVideoToAddToPlaylist(selectedVideo);
                        setShowAddToPlaylistDialog(true);
                      }}
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      В плейлист
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showAddVideoDialog} onOpenChange={setShowAddVideoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить видео с YouTube</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="video-url">Ссылка на видео</Label>
              <Input
                id="video-url"
                placeholder="https://youtube.com/watch?v=..."
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowAddVideoDialog(false)}>
                Отмена
              </Button>
              <Button onClick={addVideoFromUrl}>
                Добавить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showCreatePlaylistDialog} onOpenChange={setShowCreatePlaylistDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Создать плейлист</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label htmlFor="playlist-name">Название плейлиста</Label>
              <Input
                id="playlist-name"
                placeholder="Мой плейлист"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="mt-2"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={() => setShowCreatePlaylistDialog(false)}>
                Отмена
              </Button>
              <Button onClick={createPlaylist}>
                Создать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showAddToPlaylistDialog} onOpenChange={setShowAddToPlaylistDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить в плейлист</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 pt-4">
            {playlists.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">У вас нет плейлистов</p>
                <Button onClick={() => {
                  setShowAddToPlaylistDialog(false);
                  setShowCreatePlaylistDialog(true);
                }}>
                  Создать плейлист
                </Button>
              </div>
            ) : (
              playlists.map(playlist => (
                <Button
                  key={playlist.id}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => addToPlaylist(playlist.id)}
                >
                  <Icon name="List" size={18} className="mr-2" />
                  {playlist.name} ({playlist.videos.length})
                </Button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
