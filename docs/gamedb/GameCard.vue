<template>
  <div class="vd-game-card">
    <router-link class="vd-game-card_inner"
                 tag="div"
                 :to="`/gamedb/game/${data.id}`">
      <div class="vd-game-card_cover-container">
        <img class="vd-game-card_cover"
             :src="data.covers[0] ? data.covers[0].src : ''"
             alt="cover">
      </div>
      <div class="vd-game-card_content">
        <h2 class="vd-game-card_main-title">{{mainTitle}}</h2>
        <h3 class="vd-game-card_sub-title">{{subTitle}}</h3>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import {
  Vue,
  Component,
  Emit,
  Inject,
  Model,
  Prop,
  Provide,
  Watch,
} from 'vue-property-decorator';

@Component
export default class GameCard extends Vue {
  @Prop({ type: Object })
  private data: Game;

  public get mainTitle(): string {
    const zhCN = this.data.names.find(n => n.lang === '汉语（简体）');
    if (zhCN) {
      return zhCN.content;
    }

    const enUS = this.data.names.find(n => n.lang === '英语（美国）');
    if (enUS) {
      return enUS.content;
    }

    return this.data.name;
  }

  public get subTitle(): string {
    const zhCN = this.data.names.find(n => n.lang === '汉语（简体）');
    const enUS = this.data.names.find(n => n.lang === '英语（美国）');
    if (zhCN && enUS) {
      return enUS.content;
    }

    return ' ';
  }
}

/**
 * Base model class for gamedb
 */
interface Model {
  id: number;
  name: string;
}

type NameOfCollectionModel =
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

interface Collection extends Model {
  desc: string;
  games: Game[];
  size: number;
}

interface Game extends Model {
  /**
   * 数据分类（indienova 的数据不规范，将游戏状态混入其中，需要处理）
   */
  category: string;

  /**
   * 多语言名称与别名
   */
  names: Name[];

  /**
   * 简介
   */
  summary_text: string;
  summary_html: string;

  /**
   * 关于这款游戏
   */
  storyline_text: string;
  storyline_html: string;

  /**
   * 评分
   */
  ratings: Rating[];

  /**
   * 封面
   */
  covers: Cover[];
  /**
   * 截图
   */
  screenshots: Screenshots[];
  /**
   * 视频
   */
  videos: Videos[];

  /**
   * 系列
   */
  collections: Collection[];
  /**
   * 世界观
   */
  franchises: Collection[];

  // 以下5个字段为tag
  /**
   * 游戏模式
   */
  game_modes: Collection[];
  /**
   * 玩家视角
   */
  player_perspectives: Collection[];
  /**
   * 品类
   */
  genres: Collection[];
  /**
   * 题材
   */
  themes: Collection[];
  /**
   * 关键字（玩家自由添加，考虑丢弃）
   */
  keywords: Collection[];
  /**
   * Steam 商店分类
   */
  features: string[];

  game: Game[];
  dlcs: Game[];
  bundles: Game[];
  expansions: Game[];
  standalone_expansions: Game[];

  /**
   * 外链，比如官网
   */
  external_links: Links[];
  /**
   * 开发者
   */
  developers: Collection[];
  /**
   * 发行者
   */
  publishers: Publishers[];
  /**
   * 平台，操作系统或主机
   */
  platforms: Collection[];
  /**
   * 游戏引擎
   */
  game_engines: Collection[];

  /**
   * 首发日期
   */
  first_release_date: number;
  /**
   * 发布日期（各区域及各平台）
   */
  release_dates: {
    date: number;
    platform: Collection;
    region: string;
  }[];

  /**
   * PS商店，头像
   */
  avatars: Game[];
  /**
   * PS商店，系统主题
   */
  system_themes: Game[];
  /**
   * MS商店，内购
   */
  buy_in_app: string;

  /**
   * 音频语言
   */
  audio_lang: string;
  /**
   * 界面语言
   */
  interface_lang: string;
  /**
   * 字幕语言
   */
  subtitle_lang: string;

  /**
   * 游戏文件大小
   */
  size: string;
  /**
   * 系统需求（Steam）
   */
  system_requirements_text: string;
  system_requirements_html: string;

  updated_at: number;

  /**
   * 想关游戏
   */
  games: Game[];
}

interface Cover {
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

interface Links {
  id: number;
  name: string;
  url: string;
}

interface Name {
  content: string;
  lang: string;
}

interface Rating {
  comment_html: string;
  comment_text: string;
  id: number;
  name: string;
  system: string;
}

interface Publishers {
  region: string;
  publisher: Collection;
}

interface Screenshots {
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

interface Videos {
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
</script>