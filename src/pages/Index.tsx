import { useState, useEffect } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface Artist {
  id: number;
  name: string;
  email: string;
  avatar_url: string;
  bio: string;
  social_links: Record<string, string>;
}

interface Release {
  id: number;
  title: string;
  cover_url: string;
  upc: string;
  release_date: string;
  created_date: string;
  territories: string;
  platforms: string[];
  genre: string;
  status: string;
  artist_name?: string;
}

interface Stats {
  date: string;
  streams: number;
  downloads: number;
}

export default function Index() {
  const [releases, setReleases] = useState<Release[]>([]);
  const [stats, setStats] = useState<Stats[]>([]);
  const [artist, setArtist] = useState<Artist | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created_date");

  useEffect(() => {
    fetchArtist();
    fetchReleases();
    fetchStats();
  }, []);

  const fetchArtist = async () => {
    const mockArtist: Artist = {
      id: 1,
      name: "anwtb (cvdence Music)",
      email: "cvdence@music.com",
      avatar_url: "https://i.pravatar.cc/150?img=2",
      bio: "Alternative electronic artist",
      social_links: {
        instagram: "@cvdence",
        soundcloud: "cvdence"
      }
    };
    setArtist(mockArtist);
  };

  const fetchReleases = async () => {
    const mockReleases: Release[] = [
      {
        id: 1,
        title: "comeback to me",
        cover_url: "https://picsum.photos/seed/comeback/400/400",
        upc: "506383367981",
        release_date: "2025-11-07",
        created_date: "2025-10-29",
        territories: "Все страны",
        platforms: ["Spotify", "Apple Music", "Deezer"],
        genre: "Electronic",
        status: "published",
        artist_name: "NarGen_"
      },
      {
        id: 2,
        title: "Dark Passenger",
        cover_url: "https://picsum.photos/seed/dark/400/400",
        upc: "506383367912",
        release_date: "2025-11-07",
        created_date: "2025-10-29",
        territories: "Все страны",
        platforms: ["Spotify", "Apple Music", "YouTube Music"],
        genre: "Phonk/Fonk",
        status: "published",
        artist_name: "freakprod"
      },
      {
        id: 3,
        title: "Night Drive",
        cover_url: "https://picsum.photos/seed/night/400/400",
        upc: "506383367923",
        release_date: "2025-12-15",
        created_date: "2025-11-20",
        territories: "Все страны",
        platforms: ["Spotify", "Apple Music"],
        genre: "Electronic",
        status: "pending",
        artist_name: "NarGen_"
      },
      {
        id: 4,
        title: "Urban Lights",
        cover_url: "https://picsum.photos/seed/urban/400/400",
        upc: "506383367934",
        release_date: "2025-11-25",
        created_date: "2025-11-15",
        territories: "Все страны",
        platforms: ["Spotify"],
        genre: "Electronic",
        status: "moderation",
        artist_name: "cvdence Music"
      }
    ];
    setReleases(mockReleases);
  };

  const fetchStats = async () => {
    const mockStats: Stats[] = [
      { date: "2025-11-10", streams: 1523, downloads: 45 },
      { date: "2025-11-11", streams: 1847, downloads: 52 },
      { date: "2025-11-12", streams: 2103, downloads: 61 },
      { date: "2025-11-13", streams: 2456, downloads: 73 },
      { date: "2025-11-14", streams: 2891, downloads: 89 },
      { date: "2025-11-15", streams: 3234, downloads: 102 }
    ];
    setStats(mockStats);
  };

  const filteredReleases = releases
    .filter(release => {
      const matchesSearch = release.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           release.artist_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           release.upc.includes(searchQuery);
      const matchesPlatform = platformFilter === "all" || release.platforms.includes(platformFilter);
      return matchesSearch && matchesPlatform;
    })
    .sort((a, b) => {
      if (sortBy === "created_date") return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
      if (sortBy === "release_date") return new Date(b.release_date).getTime() - new Date(a.release_date).getTime();
      return 0;
    });

  const totalStreams = stats.reduce((acc, stat) => acc + stat.streams, 0);
  const totalDownloads = stats.reduce((acc, stat) => acc + stat.downloads, 0);

  const statusColors: Record<string, string> = {
    published: "bg-primary text-primary-foreground",
    pending: "bg-yellow-500 text-white",
    moderation: "bg-blue-500 text-white",
    draft: "bg-muted text-muted-foreground"
  };

  const statusLabels: Record<string, string> = {
    published: "Опубликован",
    pending: "Ожидает выхода",
    moderation: "На модерации",
    draft: "Черновик"
  };

  const platformData = [
    { name: "Spotify", value: 45, color: "#1DB954" },
    { name: "Apple Music", value: 30, color: "#FA243C" },
    { name: "YouTube Music", value: 15, color: "#FF0000" },
    { name: "Deezer", value: 10, color: "#00C7F2" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Icon name="Music" className="text-primary" size={28} />
                <h1 className="text-2xl font-bold">zvonko digital</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Icon name="Bell" className="mr-2" size={18} />
                Уведомления
              </Button>
              
              <ThemeToggle />
              
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                <Avatar>
                  <AvatarImage src={artist?.avatar_url} alt={artist?.name} />
                  <AvatarFallback>{artist?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-sm">
                  <div className="font-medium">{artist?.name}</div>
                  <div className="text-muted-foreground text-xs">Артист</div>
                </div>
                <Icon name="ChevronDown" size={16} />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r border-border bg-sidebar min-h-[calc(100vh-73px)] sticky top-[73px]">
          <nav className="p-4 space-y-1">
            <Button variant="ghost" className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground">
              <Icon name="Music2" className="mr-3" size={18} />
              Релизы
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="BarChart3" className="mr-3" size={18} />
              Аналитика
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Users" className="mr-3" size={18} />
              Псевдонимы
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="FileText" className="mr-3" size={18} />
              Тексты треков
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Megaphone" className="mr-3" size={18} />
              Маркетинг
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="MessageSquare" className="mr-3" size={18} />
              Поддержка
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Icon name="Settings" className="mr-3" size={18} />
              Настройки
            </Button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <Tabs defaultValue="releases" className="space-y-6">
            <TabsList>
              <TabsTrigger value="releases">Все релизы</TabsTrigger>
              <TabsTrigger value="upcoming">Предстоящие релизы</TabsTrigger>
            </TabsList>

            <TabsContent value="releases" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-2">Релизы</h2>
                  <p className="text-muted-foreground">Всего релизов: {filteredReleases.length}</p>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Icon name="Plus" className="mr-2" size={18} />
                  Новый релиз
                </Button>
              </div>

              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex-1 min-w-[300px]">
                      <div className="relative">
                        <Icon name="Search" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <Input
                          placeholder="Поиск по UPC, ISRC, треку, исполнителю, лейблу, коду партнера"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    
                    <Select value={platformFilter} onValueChange={setPlatformFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Площадки" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все площадки</SelectItem>
                        <SelectItem value="Spotify">Spotify</SelectItem>
                        <SelectItem value="Apple Music">Apple Music</SelectItem>
                        <SelectItem value="YouTube Music">YouTube Music</SelectItem>
                        <SelectItem value="Deezer">Deezer</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="created_date">Дата создания</SelectItem>
                        <SelectItem value="release_date">Дата релиза</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline">
                      Скачать каталог
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {filteredReleases.map((release) => (
                      <Card key={release.id} className="overflow-hidden transition-all hover:shadow-lg animate-fade-in cursor-pointer">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={release.cover_url}
                              alt={release.title}
                              className="w-24 h-24 rounded object-cover"
                            />
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="font-semibold text-lg mb-1">{release.title}</h3>
                                  <p className="text-sm text-muted-foreground">{release.artist_name}</p>
                                </div>
                                <Badge className={statusColors[release.status]}>
                                  {statusLabels[release.status]}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mt-3">
                                <div>
                                  <div className="text-muted-foreground text-xs mb-1">UPC</div>
                                  <div className="font-medium">{release.upc}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground text-xs mb-1">Дата релиза</div>
                                  <div className="font-medium">{new Date(release.release_date).toLocaleDateString('ru-RU')}</div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground text-xs mb-1">Территории</div>
                                  <div className="font-medium flex items-center gap-1">
                                    <Icon name="Globe" size={14} />
                                    {release.territories}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-muted-foreground text-xs mb-1">Жанр</div>
                                  <div className="font-medium">{release.genre}</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mt-3">
                                <div className="text-muted-foreground text-xs">Площадки:</div>
                                <div className="flex gap-1.5">
                                  {release.platforms.map((platform) => (
                                    <Badge key={platform} variant="outline" className="text-xs">
                                      {platform}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="icon" variant="ghost">
                                <Icon name="Download" size={18} />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Icon name="Copy" size={18} />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Icon name="ExternalLink" size={18} />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Icon name="Edit" size={18} />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Icon name="Clock" size={18} />
                              </Button>
                              <Button size="icon" variant="ghost">
                                <Icon name="Trash2" size={18} />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Статистика прослушиваний</h3>
                      <Icon name="TrendingUp" className="text-primary" size={20} />
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={stats}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={(value) => new Date(value).toLocaleDateString('ru-RU', { day: '2-digit', month: 'short' })}
                            className="text-xs"
                          />
                          <YAxis className="text-xs" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                            labelFormatter={(value) => new Date(value).toLocaleDateString('ru-RU')}
                          />
                          <Line type="monotone" dataKey="streams" stroke="#14b8a6" strokeWidth={2} name="Прослушивания" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{totalStreams.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">Всего прослушиваний</div>
                      </div>
                      <div className="text-center p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-primary">{totalDownloads.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground mt-1">Всего загрузок</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold">Распределение по площадкам</h3>
                      <Icon name="PieChart" className="text-primary" size={20} />
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={platformData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mt-6">
                      {platformData.map((platform) => (
                        <div key={platform.name} className="flex items-center gap-2 text-sm">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: platform.color }} />
                          <span className="font-medium">{platform.name}</span>
                          <span className="text-muted-foreground ml-auto">{platform.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="upcoming">
              <Card>
                <CardContent className="p-8 text-center">
                  <Icon name="Calendar" className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <h3 className="text-xl font-semibold mb-2">Предстоящие релизы</h3>
                  <p className="text-muted-foreground">У вас есть {releases.filter(r => r.status === 'pending').length} предстоящих релизов</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}