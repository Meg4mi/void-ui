<template>
  <vd-main class="vd-view-game"
           theme="dark">
    <div v-if="loading"
         class="vd-view-game_loading">载入中...</div>
    <template v-else>
      <div class="vd-view-game_background-container">
        <img class="vd-view-game_background"
             :src="background"
             alt="">
        <div class="vd-view-game_background-mask"></div>
      </div>
      <div class="vd-view-game_hero">
        <vd-clamp class="vd-view-game_hero-content">
          <h1 class="vd-view-game_main-title">{{mainTitle}}</h1>
          <h2 class="vd-view-game_sub-title">{{subTitle}}</h2>
        </vd-clamp>
      </div>
      <vd-swimlane>
        <vd-clamp>
          <div class="vd-flexbox">

            <div class="vd-flexbox_left">
              <div class="vd-view-game_screenshot-wrapper">
                <img class="vd-view-game_screenshot-selected"
                     :src="selectedScreenshot"
                     alt="">
                <img class="vd-view-game_screenshot"
                     v-for="item in data.screenshots"
                     :key="item.src"
                     :src="item.src"
                     alt=""
                     @click="selectedScreenshot = item.src">
              </div>
            </div>

            <div class="vd-flexbox_right">
              <div class="vd-view-game_info">

                <!-- 封面 -->
                <div class="vd-view-game_info-row">
                  <img class="vd-view-game_info-cover"
                       :src="data.covers[0] ? data.covers[0].src : ''"
                       alt="">
                </div>

                <div class="vd-view-game_info-row">

                  <!-- 标签 -->
                  <div class="vd-view-game_tag-wrapper">
                    <router-link v-for="item in data.game_modes"
                                 :key="item.name"
                                 :to="`/gamedb/game_modes/${item.id}`"
                                 class="vd-view-game_tag">{{item.name}}</router-link>
                    <router-link v-for="item in data.player_perspectives"
                                 :key="item.name"
                                 :to="`/gamedb/player_perspectives/${item.id}`"
                                 class="vd-view-game_tag">{{item.name}}</router-link>
                    <router-link v-for="item in data.genres"
                                 :key="item.name"
                                 :to="`/gamedb/genres/${item.id}`"
                                 class="vd-view-game_tag">{{item.name}}</router-link>
                    <router-link v-for="item in data.themes"
                                 :key="item.name"
                                 :to="`/gamedb/themes/${item.id}`"
                                 class="vd-view-game_tag">{{item.name}}</router-link>
                  </div>
                </div>

                <!-- 平台 -->
                <div class="vd-view-game_info-row">
                  <div class="vd-view-game_tag-wrapper">
                    <router-link v-for="item in data.platforms"
                                 :key="item.name"
                                 :to="`/gamedb/platforms/${item.id}`"
                                 class="vd-view-game_tag">{{item.name}}</router-link>
                  </div>
                </div>

                <!-- 引擎 -->
                <div class="vd-view-game_info-row">
                  <div class="vd-view-game_tag-wrapper">
                    <router-link v-for="item in data.game_engines"
                                 :key="item.name"
                                 :to="`/gamedb/game_engines/${item.id}`"
                                 class="vd-view-game_tag">{{item.name}}</router-link>
                  </div>
                </div>

                <!-- 简介 -->
                <div class="vd-view-game_info-row">{{data.summary_text}}</div>

              </div>

              <div class="vd-view-game_info">

                <div class="vd-view-game_info-row is-record">
                  <span class="vd-view-game_info-row-label">开发商</span>
                  <span class="vd-view-game_info-row-value">
                    <router-link v-for="(item, index) in data.developers"
                                 :key="index"
                                 :to="`/gamedb/developer/${id}`">{{item.name}}</router-link>
                  </span>
                </div>

                <div class="vd-view-game_info-row is-record">
                  <span class="vd-view-game_info-row-label">发行商</span>
                  <span class="vd-view-game_info-row-value">
                    <router-link v-for="(item, index) in data.publishers"
                                 :key="index"
                                 :to="`/gamedb/publisher/${id}`">{{item.publisher.name}}（{{item.region}}）</router-link>
                  </span>
                </div>

                <div class="vd-view-game_info-row is-record">
                  <span class="vd-view-game_info-row-label">首发日期</span>
                  <span class="vd-view-game_info-row-value">{{data.first_release_date | dateText}}</span>
                </div>

                <div class="vd-view-game_info-row is-record">
                  <span class="vd-view-game_info-row-label">发售日期</span>
                  <span class="vd-view-game_info-row-value">
                    <span v-for="(item, index) in data.release_dates"
                          :key="index">
                      {{item.region}} {{item.platform.name}} {{item.date | dateText}}
                    </span>
                  </span>
                </div>

                <div class="vd-view-game_info-row is-record">
                  <span class="vd-view-game_info-row-label">系列</span>
                  <span class="vd-view-game_info-row-value">
                    <router-link v-for="(item, index) in data.collections"
                                 :key="index"
                                 :to="`/gamedb/collection/${id}`">{{item.name}}</router-link>
                  </span>
                </div>

                <div class="vd-view-game_info-row is-record">
                  <span class="vd-view-game_info-row-label">世界观</span>
                  <span class="vd-view-game_info-row-value">
                    <router-link v-for="(item, index) in data.franchises"
                                 :key="index"
                                 :to="`/gamedb/franchises/${id}`">{{item.name}}</router-link>
                  </span>
                </div>

              </div>


            </div>
          </div>
        </vd-clamp>
      </vd-swimlane>
    </template>
  </vd-main>
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
import axios, { AxiosResponse } from 'axios';
import GameCard from '@docs/gamedb/GameCard.vue';

// tslint:disable:no-any
// tslint:disable:no-unsafe-any
const API_URL: string = '/graphql';

/**
 * View Game
 */
@Component({
  components: {
    GameCard,
  },
  filters: {
    dateText(value: number): string {
      return new Date(value).toLocaleDateString();
    },
  },
})
export default class ViewGame extends Vue {
  private get id(): number {
    return parseInt(this.$route.params.id);
  }

  private data: Game = <any>null;

  private selectedScreenshot: string = '';

  private loading: boolean = true;

  public get background(): string {
    if (this.data.screenshots.length > 0) {
      return this.data.screenshots[0].src;
    }

    return '';
  }

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

  @Watch('$route', { immediate: true })
  private async refresh(): Promise<void> {
    if (this.$route.name !== 'game') {
      return;
    }
    this.load();
  }

  private async load(): Promise<void> {
    this.loading = true;

    const data: Game = await game(this.id);
    // console.log(JSON.stringify(data, undefined, '  '));
    this.data = data;

    if (this.data.screenshots.length > 0) {
      this.selectedScreenshot = this.data.screenshots[0].src;
    }

    this.loading = false;
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

/**
 * Query Game
 */
async function game(id: number): Promise<Game> {
  const response: AxiosResponse = await axios.post(API_URL, {
    query: `
{
  game(id: ${id}) {
    id
    name
    category
    names {
      content
      lang
    }
    summary_text
    storyline_text
    covers {
      src
    }
    screenshots {
      src
    }
    videos {
      src
    }
    collections {
      id
      name
    }
    franchises {
      id
      name
    }
    game_modes {
      id
      name
    }
    player_perspectives {
      id
      name
    }
    genres {
      id
      name
    }
    themes {
      id
      name
    }
    
    game {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
    dlcs {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
    bundles {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
    expansions {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
    standalone_expansions {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
    external_links {
      name
      url
    }
    developers {
      id
      name
    }
    publishers {
      region
      publisher {
        id
        name
      }
    }
    platforms {
      id
      name
    }
    game_engines {
      id
      name
    }
    first_release_date
    release_dates {
      date
      platform {
        id
        name
      }
      region
    }
    audio_lang
    interface_lang
    subtitle_lang
    size
    games {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
  }
}
`,
  });

  return response.data.data.game;
}

/**
 * Query collection
 */
async function getCollection(
  modelName: NameOfCollectionModel,
  id: number,
  skip: number,
): Promise<Collection> {
  const response: AxiosResponse = await axios.post(API_URL, {
    query: `
{
  ${modelName}(id: ${id}) {
    id
    name
    desc
    size
    games(skip: ${skip}) {
      id
      name
      names {
        content
        lang
      }
      covers {
        src
      }
    }
  }
}
`,
  });

  return response.data.data[modelName];
}

/**
 * Query collection
 */
async function collection(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('collection', id, skip);
}

/**
 * Query franchise
 */
async function franchise(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('franchise', id, skip);
}

/**
 * Query developer
 */
async function developer(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('developer', id, skip);
}

/**
 * Query publisher
 */
async function publisher(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('publisher', id, skip);
}

/**
 * Query game_engine
 */
async function game_engine(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('game_engine', id, skip);
}

/**
 * Query platform
 */
async function platform(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('platform', id, skip);
}

/**
 * Query genre
 */
async function genre(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('genre', id, skip);
}

/**
 * Query theme
 */
async function theme(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('theme', id, skip);
}

/**
 * Query game_mode
 */
async function game_mode(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('game_mode', id, skip);
}

/**
 * Query player_perspective
 */
async function player_perspective(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('player_perspective', id, skip);
}

/**
 * Query keyword
 */
async function keyword(id: number, skip: number = 0): Promise<Collection> {
  return getCollection('keyword', id, skip);
}
</script>