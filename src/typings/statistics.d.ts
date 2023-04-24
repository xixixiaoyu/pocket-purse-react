type SummaryByHappened = {
  happened_at: string;
  tag: null;
  amount: number;
};

type SummaryByTag = {
  tag_id: number;
  tag: TagModel;
  amount: number;
};

declare namespace APIResponse {
  type SummaryPie = API.Summary<SummaryByTag>;
  type SummaryLine = API.Summary<SummaryByHappened>;
}
