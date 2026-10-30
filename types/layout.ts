export interface MetaProps {
  title: string,
  description: string,
  image?: string,
  date: string,
  /**
   * For the meta tag `og:type`
   */
  type?: string;
}
