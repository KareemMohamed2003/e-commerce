declare module '*.jpg' {
  export default '' as string;
}
declare module '*.png' {
  export default '' as string;
}
declare module '*.jpeg' {
  export default '' as string;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
