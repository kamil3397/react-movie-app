export interface Movie {
  id: number;
  title: string;
  release_date?: string;
  poster_path?: string;
  overview?: string;
  vote_average?: number;
  original_title?: string;
  original_language?: string;
  runtime?: number;
  genres?: { id: number; name: string }[]; // to moznaby wyrzucic do oddzielnego typu jak jest obiektem
}
