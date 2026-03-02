import Runtime "mo:core/Runtime";

actor {
  let appName = "Demo Advertisement";
  var pageText : Text = "Some page text with minimal Ad and CTA";

  public shared query ({ caller }) func getAppName() : async Text {
    appName;
  };

  public shared ({ caller }) func updatePageText(newPageText : Text) : async () {
    if (newPageText.size() > 1000) { Runtime.trap("Page Text is too long. Limit to 1000 chars.") };
    pageText := newPageText;
  };

  public shared query ({ caller }) func getPageText() : async Text {
    pageText;
  };
};
