export default class AloeEmoji extends Object {
  [x: string]: any;
  constructor(client: any) {
    super();
    this.tick = "<a:aloe_tick:1179855458270461982>";
    this.cross = "<a:aloe_Cross:1179839636206534658>";
    this.playing = "<a:aloe_nowplaying:1180019742619226163>";
    this.exclamation = "<a:aloe_exclaim:1180020754247594025>";
    this.queue = "<:aloe_queue:1179857036364763196>";
    this.info = "<:aloe_Info:1180000276820791327>";
    this.invite = "<:aloe_add:1179839557961797763>";
    this.support = "<:aloe_Support:1180000887272374292>";
    this.vote = "<:aloe_Voter:1180001143246573660>";
    this.badges = {
      named: "<:owner:1073672248885518597>",
      owner: "<:avonowner:1129738528209780836>",
      dev: "<:avondev:1129738531527458856>",
      admin: "<:avonadmin:1129738535952449628>",
      codev: "<:avoncodev:1129738585713692682>",
      author: "<:author_avon:1129990460128108554>",
      friend: "<:avonfriend:1129744517080301638>",
      vip: "<:avonvip:1129741519243460698>",
      premiumUser: "<:avonpremium:1129741537731948544>",
      mod: "<:avonmod:1129741496858447982>",
      staff: "<:avonstaff:1129741494157328486>",
      supporter: "<:avonsupporter:1129741524536672378>",
      user: "<:avonmembers:1129741529448185917>",
    };
    this.helpMenu = {
      music: "<:Avon_Music:1130897739086045208>",
      home: "<:Avon_Home:1131253449158307850>",
      filters: "<:Avon_Filters:1130897583242485891>",
      info: "<:Avon_Info:1130897649000783893>",
      utility: "<:Avon_Utility:1130897694605459497>",
      allCommands: "<:Avon_AllCommands:1130897613131108402>",
    };
    this.setup = {
      pause: "<:aloe_pause:1179857023907672165>",
      resume: "<:aloe_resume:1180012333251170374>",
      skip: "<:aloe_next:1179857010813042789>",
      previous: "<:aloe_previous:1180016863699275997>",
      shuffle: "<:aloe_shuffle:1179857068182737007>",
      author: "<:aloe_author:1180022960086585394>",
      nowPlaying: "<a:aloe_nowplaying:1180019742619226163>",
      requester: "<:aloe_requester:1180022612542365757>",
      duration: "<:aloe_duration:1179860969523003413>",
      stop: "<:aloe_stop:1179859959865942037>",
      loop: "<:aloe_autoplay:1179856899471056998>",
      volLow: "<:aloe_volumedown:1180010356224053288>",
      volHigh: "<:aloe_volumeup:1180010389279342673>",
      fav: "<:aloe_fav:1180021610321805312>",
      autoplay: "<:aloe_autoplay:1180011969093312553>",
      filters: "<:aloe_filter:1179861188847345756>",
    };
    this.simple = {
      emote: "<a:aloe_nowplaying:1180019742619226163>",
      nowPlaying: "<a:aloe_nowplaying:1180019742619226163>",
      requester: "<:aloe_requester:1180022612542365757>",
      duration: "<:aloe_duration:1179860969523003413>",
      filters: "<:aloe_filter:1179861188847345756>",
      pause: "<:aloe_pause:1179857023907672165>",
      resume: "<:aloe_resume:1180012333251170374>",
      stop: "<:aloe_stop:1179859959865942037>",
      skip: "<:aloe_next:1179857010813042789>",
      loop: "<:aloe_autoplay:1179856899471056998>",
    };
  }
}
