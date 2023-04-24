declare namespace Mock {
  type Request = {
    query: Params;
  };
  type Params = Record<string, string>;
}
