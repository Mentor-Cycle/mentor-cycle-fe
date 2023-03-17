export interface PropsTestimonialCard {
  maxLines: number;
  text: string;
}

export interface TruncatedTextProps {
  text: string;
  maxLines?: number;
  expanded?: boolean;
}
