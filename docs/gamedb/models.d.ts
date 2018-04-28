/**
 * Base model class for gamedb
 */
declare interface Model {
  id: number;
  name: string;
}

declare type NameOfCollectionModel =
  | 'collection'
  | 'franchise'
  | 'developer'
  | 'publisher'
  | 'game_engine'
  | 'platform'
  | 'genre'
  | 'theme'
  | 'game_mode'
  | 'player_perspective'
  | 'keyword';

declare interface Collection extends Model {
  desc: string;
  games: Game[];
  size: number;
}

declare interface Game extends Model {
  /** 数据分类（indienova 的数据不规范，将游戏状态混入其中，需要处理） */
  category: string;

  /** 多语言名称与别名 */
  names: Name[];

  /** 简介 */
  summary_text: string;
  summary_html: string;

  /** 关于这款游戏 */
  storyline_text: string;
  storyline_html: string;

  /** 评分 */
  ratings: Rating[];

  /** 封面 */
  covers: Cover[];
  /** 截图 */
  screenshots: Screenshots[];
  /** 视频 */
  videos: Videos[];

  /** 系列 */
  collections: Collection[];
  /** 世界观 */
  franchises: Collection[];

  // 以下5个字段为tag
  /** 游戏模式 */
  game_modes: Collection[];
  /** 玩家视角 */
  player_perspectives: Collection[];
  /** 品类 */
  genres: Collection[];
  /** 题材 */
  themes: Collection[];
  /** 关键字（玩家自由添加，考虑丢弃） */
  keywords: Collection[];
  /** Steam 商店分类 */
  features: string[];

  game: Game[];
  dlcs: Game[];
  bundles: Game[];
  expansions: Game[];
  standalone_expansions: Game[];

  /** 外链，比如官网 */
  external_links: Links[];
  /** 开发者 */
  developers: Collection[];
  /** 发行者 */
  publishers: Publishers[];
  /** 平台，操作系统或主机 */
  platforms: Collection[];
  /** 游戏引擎 */
  game_engines: Collection[];

  /** 首发日期 */
  first_release_date: number;
  /** 发布日期（各区域及各平台） */
  release_dates: {
    date: number;
    platform: Collection;
    region: string;
  }[];

  /** PS商店，头像 */
  avatars: Game[];
  /** PS商店，系统主题 */
  system_themes: Game[];
  /** MS商店，内购 */
  buy_in_app: string;

  /** 音频语言 */
  audio_lang: string;
  /** 界面语言 */
  interface_lang: string;
  /** 字幕语言 */
  subtitle_lang: string;

  /** 游戏文件大小 */
  size: string;
  /** 系统需求（Steam） */
  system_requirements_text: string;
  system_requirements_html: string;

  updated_at: number;

  /** 想关游戏 */
  games: Game[];
}

declare interface Cover {
  desc: string;
  format: string;
  height: string;
  index: string;
  path: string;
  size: number;
  src: string;
  type: string;
  width: string;
}

declare interface Links {
  id: number;
  name: string;
  url: string;
}

declare interface Name {
  content: string;
  lang: string;
}

declare interface Rating {
  comment_html: string;
  comment_text: string;
  id: number;
  name: string;
  system: string;
}

declare interface Publishers {
  region: string;
  publisher: Collection;
}

declare interface Screenshots {
  desc: string;
  format: string;
  height: string;
  index: string;
  path: string;
  size: number;
  src: string;
  type: string;
  width: string;
}

declare interface Videos {
  desc: string;
  format: string;
  height: string;
  index: string;
  length: string;
  path: string;
  size: number;
  src: string;
  status: string;
  type: string;
  width: string;
}
