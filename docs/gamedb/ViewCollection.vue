<template>
  <div class="vd-view-collection"
       :class="`collection-${collection}`">
    <vd-swimlane>
      <vd-clamp>
        <div class="vd-view-collection_inner">

          <vd-menu class="vd-view-collection_menu"
                   bordered
                   :items-source="menu"></vd-menu>

          <div class="vd-view-collection_content">
            <template v-if="inited">
              <h1 class="vd-view-collection_title">{{collection.toUpperCase()}}: {{data.name}}</h1>
              <div class="vd-view-collection_game-wrapper">
                <template v-if="!loading">
                  <game-card v-for="game in data.games"
                             :key="game.id"
                             :data="game"></game-card>
                </template>
                <div v-else
                     class="vd-view-collection_loading">载入中...</div>
                <h2 class="vd-view-collection_error"
                    v-if="error">数据暂缺</h2>
              </div>
              <div class="vd-view-collection_controls">
                <button :disabled="loading"
                        @click="previousItem">下一项</button>
                <div class="vd-view-collection_controls-white"></div>
                <button :disabled="loading"
                        @click="previousPage">上一页</button>
                <span class="vd-view-collection_page-number">
                  {{parseInt(skip / 10 + 1)}} / {{parseInt(data.size / 10 + 1)}}
                </span>
                <button :disabled="loading"
                        @click="nextPage">下一页</button>
                <div class="vd-view-collection_controls-white"></div>
                <button :disabled="loading"
                        @click="nextItem">下一项</button>
              </div>
            </template>
          </div>
        </div>
      </vd-clamp>
    </vd-swimlane>
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
import { Location } from 'vue-router/types/router';
import axios, { AxiosResponse } from 'axios';

import { MenuItem } from '@void/VoidUI';
import GameCard from '@docs/gamedb/GameCard.vue';

// region ======== GraphQL ========

// tslint:disable:no-any
// tslint:disable:no-unsafe-any

const API_URL: string = '/graphql';

// endregion

/**
 * View Collection
 */
@Component({
  components: {
    GameCard,
  },
})
export default class ViewCollection extends Vue {
  private menu: MenuItem[] = [
    { label: 'Collection', to: '/gamedb/collection/0' },
    { label: 'Franchise', to: '/gamedb/franchise/0' },
    { label: 'Developer', to: '/gamedb/developer/0' },
    { label: 'Publisher', to: '/gamedb/publisher/0' },
    { label: 'Game Engine', to: '/gamedb/game_engine/0' },
    { label: 'Platform', to: '/gamedb/platform/6' },
    { label: 'Genre', to: '/gamedb/genre/0' },
    { label: 'Theme', to: '/gamedb/theme/0' },
    { label: 'Game Mode', to: '/gamedb/game_mode/0' },
    { label: 'Player Perspective', to: '/gamedb/player_perspective/0' },
    { label: 'Keyword', to: '/gamedb/keyword/0' },
  ];

  private get collection(): NameOfCollectionModel {
    return <NameOfCollectionModel>this.$route.params.collection;
  }
  private get id(): number {
    return parseInt(this.$route.params.id);
  }
  private skip: number = 0;

  private data: Collection = {
    id: 0,
    name: '',
    desc: '',
    games: [],
    size: 0,
  };

  private inited: boolean = false;
  private loading: boolean = false;
  private error: boolean = false;

  @Watch('$route', { immediate: true })
  private async refresh(): Promise<void> {
    if (this.$route.name !== 'collection') {
      return;
    }
    this.load();
  }

  private async load() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.error = false;

    const collection: Collection = await getCollection(
      this.collection,
      this.id,
      this.skip,
    );
    // console.log(JSON.stringify(collection, undefined, '  '));
    this.data = collection;

    if (!this.data.name || this.data.games.length === 0) {
      this.error = true;
    }

    this.inited = true;
    this.loading = false;
  }

  private previousItem(): void {
    if (this.id > 0) {
      this.skip = 0;
      this.$router.push({
        params: { id: (this.id - 1).toString() },
      });
    }
  }

  private nextItem(): void {
    this.skip = 0;
    this.$router.push({
      params: { id: (this.id + 1).toString() },
    });
  }

  private previousPage(): void {
    if (this.skip > 0) {
      this.skip -= 10;
      this.load();
    }
  }

  private nextPage(): void {
    if (this.data.size - this.skip > 10) {
      this.skip += 10;
      this.load();
    }
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
  game(id: 1005) {
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
      desc
      format
      height
      index
      path
      size
      src
      type
      width
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