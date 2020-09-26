import { EventEmitter } from 'events';
import { Channel, Client, ClientOptions, Guild, User } from 'eris';

declare module 'eris-sharder' {
  export class Master extends EventEmitter {
    public shardCount: number;
    public firstShardID: number;
    public lastShardID: number;
    public clusterCount: number;
    public clusterTimeout: number;
    public token: string | false;
    public clusters: Map<number, unknown>;
    public workers: Map<number, unknown>;
    public queue: Array<unknown>;
    public eris: Client;
    public options: {
      stats: ErisSharderStats;
    };
    public statsInterval: number;
    public mainFile: string;
    public name: string;
    public guildsPerShard: number;
    public webhooks: {
      cluster?: string;
      shard?: string;
    };
    public debug: boolean;
    public clientOptions: ClientOptions;
    public callbacks: Map<number, any>;
    constructor(token: string, mainFile: string, clientOptions?: SharderOptions);
    public isMaster(): boolean;
    public startStats(): void;
    public executeStats(clusters: Array<unknown>, start: number): void;
    public start(clusterID: number): void;
    public launch(): void;
    public chunk(shards: Array<number>, clusterCount: number): Array<Array<number>>
    public connectShards(): void;
    public sendWebhook(type: string, embed): void;
    public printLogo(): void;
    public restartCluster(worker: unknown, code: number): void;
    public calculateShards(): Promise<number>;
    public fetchInfo(start: number, type: unknown, value: unknown): void;
    public broadcast(start: number, message: unknown): void;
    public sendTo(cluster: unknown, message: unknown): void;
  }
  export class Base {
    public bot: boolean;
    public clusterID: number;
    public ipc: ErisSharderIPC;
    constructor(bot, clusterID?, ipc?);
    public restartCluster(clusterID: number): void;
  }

  interface SharderOptions {
    stats?: boolean;
    webhooks?: {
      shard: SharderWebhook;
      cluster: SharderWebhook;
    };
    clientOptions?: ClientOptions;
    clusters: number;
    clusterTimeout?: number;
    shards?: number;
    firstShardID?: number;
    lastShardID?: number;
    debug?: boolean;
    statsInterval?: number;
    name?: string;
    guildsPerShard?: number;
  }

  interface SharderWebhook {
    id: string;
    token: string;
  }

  interface ErisSharderIPC extends EventEmitter {
    events: Map<string, ErisSharderEvent>;
    register(event: string, callback: Function): void;
    unregister(name: string): void;
    broadcast(name: string, message?: unknown): void;
    sendTo(cluster: number, name: string, message?: unknown): void;
    fetchUser(id: string): Promise<User>;
    fetchGuild(id: string): Promise<Guild>;
    fetchChannel(id: string): Promise<Channel>;
  }

  interface ErisSharderEvent {
    fn: (msg: unknown) => void;
  }

  interface ErisSharderStats {
    stats: {
      guilds: number;
      users: number;
      totalRam: number;
      voice: number;
      exclusiveGuilds: number;
      largeGuilds: number;
      clusters: Array<unknown>;
    };
    clustersCounted: number;
  }
}
