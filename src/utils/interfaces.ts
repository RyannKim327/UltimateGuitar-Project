export type METHOD_RESULT = string;
export type CATEGORY = number;

export interface GuitarTabs {
  id: number;
  song_id: number;
  song_name: string;
  artist_id: number;
  artist_name: string;
  type: string;
  part: string;
  version: number;
  votes: number;
  difficulty: string;
  rating: number;
  date: string | number;
  status: string;
  preset_id: number;
  tab_access_type: string;
  tp_version: number;
  tonality_name: string;
  version_description: string;
  verified: number;
  recording: {
    is_accoustic: number;
    tonality_name: string;
    performance: unknown | null;
    recording_artists: unknown;
    video_urls: unknown | null;
  };
  album_cover: {
    has_album_cover: boolean;
    web_album_cover: unknown;
  };
  artist_cover: {
    has_artist_cover: boolean;
    web_artist_cover: unknown;
  };
  artist_url: string;
  tab_url: string;
  marketing_type?: string;
}
