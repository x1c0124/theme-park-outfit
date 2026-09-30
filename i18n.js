// UI + outfit copy in every supported language. Add a language by adding a top-level key.

const LANGS = { zh: '中文', en: 'English' };

const I18N = {
  zh: {
    ui: {
      tagline: '去乐园穿什么：看天气，挑穿搭',
      subtitle: '去主题乐园穿什么：根据奥兰多和洛杉矶的实时天气预报，给出男生和女生的穿搭建议',
      language: '语言',
      open: '入园', close: '离园',
      today: '今天', tomorrow: '明天',
      weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      loading: '正在获取天气预报…',
      noData: '这一天在所选时段内没有预报数据，换一天试试。',
      fetchFail: '天气 API 请求失败 (HTTP {s})，请刷新重试。',
      networkFail: '连不上天气服务，请检查网络后刷新重试。',
      forecast: '16 天预报', hourly: '园内逐小时', hi: '最高', lo: '最低', feelsMaxShort: '体感最高',
      feelsLabel: '🌡️ 体感', feelsNote: '早晚最低 {t}',
      rainLabel: '🌧️ 降雨概率', rainNote: '园内降雨量 {r}',
      rainTimeLabel: '⏱️ 降雨时段', rainTimeNone: '无',
      uvLabel: '☀️ 紫外线', uvLevels: ['低', '中等', '强', '很强', '极强'],
      humLabel: '💧 湿度', humSticky: '闷热，选速干面料', humDry: '比较干爽',
      windLabel: '💨 风速', windNote: '园内最大风速',
      disneyLabel: '🏰 迪士尼室内', universalLabel: '🎬 环球室内', estNote: '估算', estColderNote: '估算 · 更冷',
      indoorNote: '乐园不公开室内温度，室内数值是估算：环球的室内通常比迪士尼更冷。',
      legendRain: '降雨概率', legendTemp: '体感温度', chartTip: '{h}:00 降雨概率 {p}%',
      rainChoice: '今天有雨，想怎么穿？', rainOutfit: '🧥 雨天穿搭', umbrellaOutfit: '🌂 我会带伞，按温度穿',
      female: '女生穿搭', male: '男生穿搭', why: '为什么这样穿', swap: '换一个', bag: '🎒 背包清单', tips: '💡 小贴士',
      top: '上衣', bottom: '下装', shoes: '鞋子', layer: '外套 / 叠穿', acc: '配饰',
      footer: '天气数据来自 <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>，最多可查未来 16 天。穿搭建议由规则自动生成，仅供参考。',
    },
    wmo: {
      0: '晴', 1: '大致晴朗', 2: '多云', 3: '阴', 45: '雾', 48: '冻雾',
      51: '小毛毛雨', 53: '毛毛雨', 55: '浓毛毛雨', 56: '冻毛毛雨', 57: '冻毛毛雨',
      61: '小雨', 63: '中雨', 65: '大雨', 66: '冻雨', 67: '冻雨',
      71: '小雪', 73: '中雪', 75: '大雪', 77: '雪粒',
      80: '阵雨', 81: '强阵雨', 82: '暴雨', 85: '阵雪', 86: '强阵雪',
      95: '雷阵雨', 96: '雷暴伴冰雹', 99: '强雷暴伴冰雹',
    },
    cityShort: { orlando: '奥兰多', la: '洛杉矶' },
    city: { orlando: 'Orlando 奥兰多', la: 'Los Angeles 洛杉矶' },
    sep: '；', listSep: '、', dot: ' · ',
    heat: { scorch: '酷热', hot: '炎热', warm: '温暖', mild: '舒适偏凉', cool: '凉', cold: '冷' },
    rain: { storm: '有雷雨', heavy: '有雨', likely: '可能下雨', low: '基本不下雨' },
    key: { poncho: '雨衣必带', sun: '重点防晒', layer: '带件外套', light: '轻装出行' },
    // Outfits per temperature band
    looks: {
      // Women: several looks per band, cycled with the 换一个 button. `id` is the reference photo
      // (IMG_xxxx in 女性穿搭) and names the avatar file, e.g. avatars/female-0546.png.
      // Items name the garment type and rough fabric (no colours) plus why it suits the weather.
      f: {
        hot: [
          {
            id: '0546', name: '吊带 + 短袖衬衫 + 百慕大短裤', top: '吊带 + 敞开穿的宽松短袖衬衫（棉麻）：吊带透气，衬衫多挡一层太阳', bottom: '百慕大及膝短裤（棉质）：凉快，坐过山车也不走光',
            shoes: '凉鞋：透气不闷脚', layer: '衬衫就是外层：晒的时候扣上，进空调室内也不冷', acc: '棒球帽：遮阳；小腰包：放手机和门票',
            why: ['短裤比裙子方便：上下过山车不走光，排队累了也能随地坐。', '吊带外面敞开穿短袖衬衫，透气又防晒。'],
          },
          {
            id: '0554', name: '吊带 + 格子衬衫 + 亚麻阔腿裤', top: '吊带 + 敞开穿的格子衬衫（薄棉）：吊带透气，衬衫防晒', bottom: '亚麻阔腿裤：轻薄透气、干得快，湿热天不闷',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '格子衬衫当外层，进空调室内也能穿', acc: '墨镜；单肩包；折叠伞：排队时遮太阳',
            why: ['吊带加敞开的衬衫最透气，衬衫还能挡太阳。', '亚麻阔腿裤轻薄透气、干得快，湿热天比牛仔裤和棉裤凉快得多。'],
          },
          {
            id: '0548', name: '挂脖吊带 + 伞裙', top: '挂脖吊带（棉质）：露肩透气，最热的时候也不闷', bottom: '中长伞裙 + 里面加安全裤：裙摆通风，坐过山车不走光',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '不用外套，包里放一件薄开衫应付室内空调', acc: '发夹；斜挎小包',
            why: ['挂脖吊带露出肩膀，最热的时候也不闷。', '伞裙通风，里面加安全裤，坐过山车也不怕走光。'],
          },
          {
            id: 'linen', name: '吊带 + 亚麻衬衫 + 工装短裤', top: '吊带 + 敞开穿的亚麻衬衫：亚麻轻薄透气、干得快，衬衫还能遮阳', bottom: '工装短裤（棉质）：凉快，口袋多',
            shoes: '凉鞋：透气不闷脚', layer: '亚麻衬衫就是外层：晒的时候穿上，进空调室内也不冷', acc: '头巾：遮阳又挡汗；斜挎包',
            why: ['亚麻衬衫是酷暑最好用的外搭：透气、干得快，还能挡住大半的太阳。', '短裤加凉鞋，最热的时候腿脚也不闷。'],
          },
          {
            id: 'mesh', name: '吊带 + 网格长袖 T 恤 + 阔腿裤', top: '吊带 + 半镂空网格长袖 T 恤：网眼透气，长袖遮阳', bottom: '宽松阔腿裤（轻薄棉）：不贴腿，走起来通风',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '网格长袖就是遮阳层，不用再带外套', acc: '耳环；小包',
            why: ['半镂空网格长袖又遮阳又透气，比短袖少晒，比普通长袖凉快。', '宽松阔腿裤不贴腿，风一吹就凉。'],
          },
          {
            id: 'tencel', name: '亚麻长袖 + 天丝半裙', top: '吊带 + 亚麻长袖罩衫：透气遮阳', bottom: '天丝长半裙 + 里面加安全裤：垂感好，贴在身上也是凉的',
            shoes: '凉鞋：透气不闷脚', layer: '亚麻长袖就是遮阳层', acc: '墨镜；项链；斜挎小包',
            why: ['天丝面料垂顺、摸起来凉，走路时裙摆带风。', '亚麻长袖遮住手臂，防晒又不闷。'],
          },
          {
            id: 'poplin', name: '宽松衬衫 + 棉麻短裤', top: '宽松纯棉衬衫（袖子卷起）：吸汗，宽松透风', bottom: '高腰棉麻短裤：轻薄凉快',
            shoes: '凉鞋：透气不闷脚', layer: '不用外套；长袖衬衫本身就能遮阳', acc: '墨镜；斜挎小包',
            why: ['宽松衬衫不贴身，风能从袖口和下摆吹进来。', '棉麻短裤比牛仔短裤轻薄，出汗也不闷。'],
          },
          {
            id: 'linenset', name: '吊带 + 亚麻衬衫 + 亚麻阔腿裤', top: '吊带 + 宽松亚麻衬衫：轻薄透气、干得快，还能遮阳', bottom: '亚麻阔腿裤：轻薄垂坠，走起来带风',
            shoes: '凉鞋：透气不闷脚', layer: '亚麻衬衫就是外层，进空调室内也不冷', acc: '项链；斜挎小包',
            why: ['一整套亚麻，全身都透气，湿热天最舒服。', '亚麻衬衫的长袖能遮阳，热了敞开、冷了扣上。'],
          },
          {
            id: 'jorts', name: '吊带背心 + 及膝牛仔短裤', top: '罗纹吊带背心（棉质）：贴身但透气', bottom: '及膝宽松牛仔短裤 + 腰带：宽松不闷，长度刚好不走光',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '不用外套，包里放一件薄衬衫应付室内空调', acc: '棒球帽；墨镜；单肩小包',
            why: ['宽松的及膝牛仔短裤比紧身短裤透气，坐过山车也不会走光。', '帽子加墨镜，排队暴晒时脸和眼睛都有保护。'],
          },
          {
            id: 'stripeshirt', name: '吊带 + 条纹衬衫 + 运动短裤', top: '吊带 + 宽松条纹衬衫（棉质）：透风，还能挡太阳', bottom: '贴身运动短裤（弹力）：好活动，坐过山车不走光',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '条纹衬衫就是外层，进空调室内扣上', acc: '棒球帽；手提包',
            why: ['宽松衬衫配运动短裤，上面遮阳、下面凉快。', '运动短裤有弹力，爬上爬下都方便。'],
          },
          {
            id: 'trackshorts', name: '条纹衬衫 + 运动短裤', top: '宽松条纹长袖衬衫（棉质，袖子卷起）：遮阳透风', bottom: '运动短裤（速干）：轻薄快干',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '衬衫本身就能遮阳，晒的时候把袖子放下来', acc: '不用额外配饰，轻装出行',
            why: ['宽松长袖衬衫遮阳透风，比短袖少晒。', '速干运动短裤轻薄，出汗也不闷。'],
          },
          {
            id: 'satincami', name: '缎面吊带 + 速干阔腿裤', top: '蕾丝边醋酸缎面吊带：顺滑凉爽，不贴身', bottom: '速干运动阔腿裤：轻薄快干，不闷腿',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '不用外套，包里放一件薄开衫应付室内空调', acc: '项链；单肩小包',
            why: ['醋酸面料摸起来凉，夏天穿很清爽。', '速干阔腿裤轻薄透气，又比短裤多挡太阳。'],
          },
        ],
        warm: [
          {
            id: '0565', name: '印花 T 恤 + 直筒牛仔裤', top: '印花短袖 T 恤（纯棉，常规厚度）：吸汗，比亚麻挺括一点', bottom: '直筒牛仔裤（中等厚度）：耐磨，温暖天穿不闷',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '去环球包里带一件薄外套；迪士尼可以不带', acc: '棒球帽：遮阳；双肩包：装雨衣和充电宝',
            why: ['最经典的乐园搭配：运动鞋好走，双肩包能装雨衣和充电宝。', '棒球帽挡太阳，拍照也好看。'],
          },
          {
            id: '0566', name: '短开衫 + 阔腿裤', top: '短款背心 + 短款开衫（薄棉针织，细密轻盈）：开衫能穿能脱', bottom: '松紧腰阔腿裤（斜纹棉）：宽松舒服，坐着排队不勒',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '针织开衫：热了系在腰上，进环球的室内正好穿上', acc: '皮质斜挎包',
            why: ['开衫是这套的关键，白天晚上都用得上。', '松紧腰阔腿裤坐着排队、坐游乐设施都舒服。'],
          },
          {
            id: '0545', name: 'Polo 衫 + 裙裤叠穿', top: '条纹短袖 Polo 衫（珠地棉）+ 领带：透气，领子能挡后颈的太阳', bottom: '百褶短裙叠穿阔腿裤（涤棉混纺）：学院风，坐过山车不怕走光',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '去环球包里带一件薄外套；迪士尼可以不带', acc: '发夹；小手提包',
            why: ['裙子叠长裤，有学院风，坐过山车也完全不怕走光。', 'Polo 衫透气，领子还能挡一点后颈的太阳。'],
          },
          {
            id: '0553', name: 'T 恤 + A 字裙', top: '薄纱短袖罩衫 + 细长围巾（薄棉）：轻薄，温暖天刚好', bottom: 'A 字中长裙（棉混纺）+ 里面加安全裤：行动方便，玩项目不走光',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '去环球包里带一件薄外套；迪士尼可以不带', acc: '发箍；腰带；斜挎小包',
            why: ['简单的配色耐看，拍照不出错。', 'A 字裙行动方便，加了安全裤可以放心玩项目。'],
          },
          {
            id: '0555', name: '修身 T 恤 + 直筒牛仔裤', top: '修身短袖 T 恤（纯棉，常规厚度）：简单清爽', bottom: '高腰直筒牛仔裤（中等厚度）+ 细腰带：耐磨，排队坐着、爬上爬下都不怕',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '去环球带一件薄衬衫或外套；迪士尼可以不带', acc: '斜挎小包挂一个公仔',
            why: ['鲜艳的上衣在人群里很显眼，走散了容易找到。', '直筒牛仔裤耐磨，坐着排队、爬上爬下都不怕。'],
          },
          {
            id: '0556', name: '条纹一字肩 + 阔腿裤', top: '条纹一字肩长袖（薄棉）：长袖但轻薄', bottom: '松紧腰阔腿裤：宽松好活动',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '长袖本身就是外层，傍晚冷了加一件开衫', acc: '项圈；斜挎包',
            why: ['长袖但面料薄，适合凉天里偏暖的下午。', '条纹在人群里很好认，拍照也显精神。'],
          },
          {
            id: '0564', name: '波点连衣裙 + 针织开衫', top: '吊带连衣裙（棉质）+ 短款针织开衫', bottom: '连衣裙里面加安全裤',
            shoes: '靴子：挡风保暖，选平底的更好走', layer: '针织开衫：凉了穿上，热了系在腰上', acc: '眼镜；项链；小包',
            why: ['连衣裙加开衫，一件就搞定，凉天刚好。', '裙子里加安全裤；长靴选平底的，走路不累。'],
          },
        ],
        cool: [
          {
            id: '0559', name: '条纹毛衣 + 阔腿牛仔裤', top: '条纹针织毛衣 + 蕾丝打底：一件就够暖', bottom: '阔腿牛仔裤：耐磨，凉天穿不闷',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '毛衣本身够暖；早上冷再加一件夹克', acc: '斜挎包：拉链能拉紧，比托特包安全',
            why: ['一件毛衣就能应付偏暖的凉天，不用多带东西。', '阔腿牛仔裤耐磨耐脏，凉天穿也不闷。'],
          },
          {
            id: '0561', name: '灯芯绒夹克 + 工装裤', top: '修身打底 + 小丝巾', bottom: '工装阔腿裤（斜纹棉）：口袋多，手机门票都有地方放',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '灯芯绒夹克：早上穿，中午回暖就脱掉', acc: '腰带；斜挎包',
            why: ['夹克能穿能脱，适合早晚冷、中午暖的天气。', '工装裤口袋多，手机、门票、零钱都有地方放。'],
          },
          {
            id: '0550', name: '牛仔夹克 + 阔腿裤', top: '高领打底（薄针织）', bottom: '高腰阔腿牛仔裤 + 腰带',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '牛仔夹克：挡风，中午热了可以脱', acc: '墨镜；单肩包',
            why: ['牛仔夹克挡风又能脱，适合早晚凉的天气。', '高领打底加夹克，早晚凉的时候脖子也不冷。'],
          },
          {
            id: '0551', name: '短开衫 + 波点百褶裙', top: '针织打底 + 短款开衫（针织）', bottom: '波点百褶中长裙 + 里面加安全裤',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '开衫：冷了扣上，热了系在腰上', acc: '猫眼墨镜；串珠小包；腰带',
            why: ['开衫加针织打底，温度变化时加减方便。', '裙子里加安全裤，坐过山车也不怕走光。'],
          },
          {
            id: '0552', name: '针织开衫 + 格纹长裙', top: '花边领衬衫 + 针织开衫：两层，凉天刚好', bottom: '格纹蛋糕长裙 + 里面加安全裤',
            shoes: '平底鞋：好走，站着排队脚不累', layer: '针织开衫：早上穿，中午热了脱下', acc: '双马尾 + 发夹；小手提包；项链挂件',
            why: ['衬衫加开衫两层，凉天刚好。', '长裙在脚踝以上，走路不会踩到；里面加安全裤，玩项目也方便。'],
          },
          {
            id: '0562', name: '图案毛衣 + 系带阔腿裤', top: '圆领图案毛衣（厚针织）：一件就够暖', bottom: '系带阔腿西裤（毛呢混纺）：宽松，坐游乐设施不紧绷',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '早上冷可以加一件夹克', acc: '眼镜；斜挎包',
            why: ['一件毛衣就够，适合凉天里偏冷的日子。', '宽松阔腿裤舒服，坐游乐设施也不紧绷。'],
          },
          {
            id: '0563', name: '短风衣 + 短裙长靴', top: '高领打底', bottom: '短裙 + 里面加安全裤',
            shoes: '靴子：挡风保暖，选平底的更好走', layer: '立领系带短风衣：挡风，腰带一系就有型', acc: '眼镜；丝巾；单肩包',
            why: ['短风衣挡风，腰带一系就有型。', '短裙一定要加安全裤；长靴选平底的，才走得了一天。'],
          },
          {
            id: 'shellf', name: '冲锋衣 + T 恤 + 速干阔腿裤', top: '短袖 T 恤 + 轻薄连帽冲锋衣：防风防泼水，拉链一拉就挡风', bottom: '速干工装阔腿裤：轻薄挡风，下小雨也干得快',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '冲锋衣：有风时拉上，热了脱下塞进双肩包', acc: '墨镜；双肩包',
            why: ['轻薄冲锋衣挡风又防小雨，叠起来很小，有风的凉天最实用。', '速干阔腿裤和冲锋衣是一套思路：挡风、快干，天气变了也不怕。'],
          },
        ],
        cold: [
          {
            id: '0560', name: '牛角扣大衣 + 阔腿裤', top: '高领打底 + 连帽卫衣', bottom: '卷边阔腿裤（毛呢）',
            shoes: '靴子：挡风保暖，选平底的更好走', layer: '连帽牛角扣大衣（羊毛呢）：够长，排队腿也不冷', acc: '手套；斜挎包',
            why: ['大衣够长，排队站着腿也不冷。', '靴子保暖挡风，排队站久了脚也不冷。'],
          },
          {
            id: '0558', name: '长外套 + 毛衣背心', top: '衬衫 + 条纹毛衣背心（针织）', bottom: '中长半裙 + 加厚打底裤：保暖，也不怕走光',
            shoes: '靴子：挡风保暖，选平底的更好走', layer: '宽松长外套（毛呢）：中午回暖只脱外套', acc: '格纹报童帽；小手提包',
            why: ['衬衫、毛衣背心、外套三层叠穿，中午回暖只脱外套就行。', '半裙里穿了加厚打底裤，保暖，玩项目也不怕走光。'],
          },
        ],
        rain: {
          id: 'rain', name: '雨衣 + 速干短打', top: '速干短袖 T 恤：湿了也很快干', bottom: '速干运动短裤：不吸水',
          shoes: '凉鞋：透气不闷脚', layer: '透明一次性雨衣：比打伞方便', acc: '手机防水袋；小包放在雨衣里面',
          why: ['热天下雨，速干衣服很快就干，牛仔湿了一整天都不干。', '凉鞋不怕进水，雨停了脚也不闷。'],
        },
      },
      // Men: several looks per band too, cycled with their own 换一个 button (avatars/male-<id>.png).
      m: {
        hot: [
          {
            id: '0571', name: 'T 恤 + 垂感阔腿裤', top: '宽松短袖 T 恤（纯棉）：吸汗透气', bottom: '垂感阔腿裤（薄款）：不贴腿，走起来带风',
            shoes: '凉鞋：透气不闷脚', layer: '不用外套；怕室内冷可以带一件薄衬衫', acc: '墨镜；斜挎包',
            why: ['宽松 T 恤配垂感阔腿裤，全身都不贴身，热天也清爽。', '阔腿裤比短裤多挡一层太阳，腿不容易晒伤。'],
          },
          {
            id: '0574', name: 'T 恤 + 短裤', top: '短袖 T 恤（纯棉）：简单透气', bottom: '短裤（棉质）：凉快',
            shoes: '凉鞋：透气不闷脚', layer: '不用外套；怕室内冷可以带一件薄衬衫', acc: '棒球帽；墨镜；托特包',
            why: ['T 恤加短裤是炎热天最省心的搭配。', '帽子加墨镜，排队暴晒时脸和眼睛都有保护。'],
          },
          {
            id: '0573', name: '敞开衬衫 + 牛仔短裤', top: 'T 恤 + 敞开穿的薄衬衫（棉质）：衬衫防晒，进室内也能穿', bottom: '牛仔短裤：耐磨，好活动',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '衬衫就是外层：进空调室内扣上', acc: '斜挎包',
            why: ['敞开的薄衬衫既防晒又透气，进空调室内扣上就不冷。', '短裤配运动鞋，走一整天也轻松。'],
          },
          {
            id: '0572', name: '条纹衬衫 + 短裤', top: '条纹长袖衬衫（棉质，袖子卷起）：遮阳透气', bottom: '短裤（棉质）：凉快',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '衬衫本身就能遮阳，晒的时候把袖子放下来', acc: '托特包',
            why: ['长袖衬衫卷起袖子，想遮阳就放下来。', '短裤让下半身保持凉快。'],
          },
          {
            id: '0578', name: '宽松 T 恤 + 阔腿裤', top: 'oversize 短袖 T 恤（纯棉）：宽松透风', bottom: '宽松阔腿裤（薄款）：通风又遮阳',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '不用外套；怕室内冷可以带一件薄衬衫', acc: '墨镜；双肩包：装雨衣和充电宝',
            why: ['oversize T 恤不贴身，汗不容易闷着。', '宽松阔腿裤通风，又比短裤多挡太阳。'],
          },
          {
            id: 'tankdye', name: '背心 + 腰间衬衫 + 短裤', top: '背心（棉质）：最透气', bottom: '毛边短裤（棉质）：凉快好活动',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '长袖衬衫系在腰上：进空调室内拿出来穿', acc: '项链；相机',
            why: ['背心最透气，腰上系一件衬衫，进室内就能穿上。', '短裤配运动鞋，走一整天也不累。'],
          },
          {
            id: 'crochet', name: '背心 + 镂空针织衬衫 + 短裤', top: '背心 + 敞开穿的钩针镂空衬衫：网眼透风，遮阳又不闷', bottom: '印花短裤（棉质）：凉快',
            shoes: '凉鞋：透气不闷脚', layer: '镂空衬衫就是遮阳层', acc: '草编宽檐帽；墨镜；项链',
            why: ['钩针镂空衬衫透风，比普通衬衫凉快，又能挡一部分太阳。', '草编宽檐帽遮阳范围大，透气不闷头。'],
          },
          {
            id: 'resort', name: '背心 + 短袖衬衫 + 运动短裤', top: '背心 + 敞开穿的印花短袖衬衫（薄款）：透风', bottom: '网眼运动短裤：透气快干',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '短袖衬衫就是外层', acc: '棒球帽；墨镜',
            why: ['网眼运动短裤透气快干，出汗也不闷。', '敞开的短袖衬衫透风，还能挡一点太阳。'],
          },
          {
            id: 'drape', name: '背心 + 搭肩 T 恤 + 短裤', top: '背心（棉质）+ 一件 T 恤搭在肩上：室外穿背心，进室内套上 T 恤', bottom: '短裤（棉质）：凉快',
            shoes: '凉鞋：透气不闷脚', layer: '搭在肩上的 T 恤：进空调室内套上', acc: '棒球帽；斜挎包；项链',
            why: ['背心加一件随手能套上的 T 恤，室外凉快、室内不冷。', '凉鞋透气，热天脚不闷。'],
          },
          {
            id: 'knitvest', name: '镂空针织背心 + 亚麻长裤', top: '背心 + 钩针镂空针织背心：叠穿也透风', bottom: '亚麻抽绳阔腿裤：轻薄透气、干得快',
            shoes: '凉鞋：透气不闷脚', layer: '不用外套', acc: '草编帽；墨镜；项链',
            why: ['亚麻长裤轻薄透气，又比短裤多挡太阳。', '镂空针织背心有层次感，但一点也不闷。'],
          },
          {
            id: 'sporty', name: '无袖 T 恤 + 双层短裤', top: '宽松无袖 T 恤（棉质）：两边通风，最热的时候也清爽', bottom: '双层短裤：里面有打底，坐过山车、爬上爬下都不走光',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '不用外套；怕室内冷可以带一件薄 T 恤', acc: '发带：挡汗；手绳；冰饮',
            why: ['宽松无袖 T 恤两边通风，比普通 T 恤凉快，又不像背心那么随便。', '发带挡住额头的汗，排队暴晒时汗不会流进眼睛。'],
          },
        ],
        warm: [
          {
            id: '0567', name: '条纹衬衫 + 直筒牛仔裤', top: 'T 恤 + 敞开穿的条纹衬衫（纯棉府绸）：透气，冷了扣上', bottom: '直筒牛仔裤（中等厚度）+ 皮带：耐磨',
            shoes: '休闲鞋：好走又百搭', layer: '衬衫就是外层；进环球的室内扣上就行', acc: '项链',
            why: ['衬衫敞开穿透气，冷了扣上就行。', '直筒牛仔裤耐磨，排队坐着也不怕。'],
          },
          {
            id: '0570', name: '薄开衫 + T 恤 + 牛仔裤', top: 'T 恤（纯棉）+ 细针织薄开衫：轻薄垂坠，能穿能脱', bottom: '直筒牛仔裤（中等厚度）：耐磨',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '薄开衫：热了脱下，进环球的室内正好穿上', acc: '墨镜',
            why: ['薄开衫能穿能脱，温暖天刚好。', '一身简单好搭，走一天也舒服。'],
          },
          {
            id: '0575', name: '衬衫 + 小丝巾 + 牛仔裤', top: '长袖衬衫（纯棉，比夏天的衬衫厚一点）+ 小丝巾：卷起袖子就凉快', bottom: '直筒牛仔裤（中等厚度）+ 皮带：耐磨',
            shoes: '休闲鞋：好走又百搭', layer: '衬衫本身就是外层；去环球可以再带一件薄外套', acc: '斜挎包',
            why: ['长袖衬衫卷起袖子就凉快，放下来就挡风。', '小丝巾加一点亮点，拍照好看。'],
          },
          {
            id: 'layered', name: '叠穿 T 恤 + 工装短裤', top: '短袖 T 恤叠穿长袖打底（纯棉）：早晚凉也不怕', bottom: '迷彩工装短裤（斜纹棉）：口袋多，下半身凉快',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '去环球包里带一件薄外套；迪士尼可以不带', acc: '反戴棒球帽；墨镜',
            why: ['T 恤叠长袖，早晚凉的时候刚好。', '工装短裤口袋多，下半身也凉快。'],
          },
        ],
        cool: [
          {
            id: '0568', name: '毛衣 + 衬衫 + 工装裤', top: '衬衫 + 圆领毛衣（针织）：冷了穿上，热了脱掉只剩衬衫', bottom: '工装裤（斜纹棉）：口袋多',
            shoes: '休闲鞋：好走又百搭', layer: '毛衣就是保暖层，中午热了可以脱', acc: '毛线帽；咖啡',
            why: ['衬衫叠毛衣，冷了穿上，热了脱掉只剩衬衫。', '毛线帽早上保暖，不占地方。'],
          },
          {
            id: '0576', name: '夹克 + 披肩毛衣 + 休闲裤', top: 'T 恤 + 夹克，肩上披一件毛衣', bottom: '休闲长裤（斜纹棉）：舒服好走',
            shoes: '休闲鞋：好走又百搭', layer: '夹克挡风；披在肩上的毛衣冷了就穿上', acc: '斜挎包；钥匙挂件',
            why: ['夹克加毛衣两层保暖，可以一层层脱。', '休闲长裤舒服好走。'],
          },
          {
            id: '0577', name: '半拉链卫衣 + 工装裤', top: '半拉链卫衣（毛圈棉）：热了拉开领口散热', bottom: '工装长裤：耐磨挡风',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '卫衣本身够暖；早上冷可以再加一件夹克', acc: '棒球帽；墨镜',
            why: ['半拉链可以拉开散热，温度变化时好调节。', '工装长裤耐磨，也挡风。'],
          },
          {
            id: 'shell', name: '冲锋衣 + 背心 + 及膝短裤', top: '背心 + 轻薄连帽冲锋衣：防风防泼水，拉链一拉就挡风', bottom: '宽松及膝短裤（垂感面料）：下半身不闷',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '冲锋衣：有风的时候拉上，热了脱下来塞进包里', acc: '项链',
            why: ['轻薄冲锋衣挡风又防小雨，叠起来很小，有风的凉天最实用。', '上身挡风、下身短裤，适合凉天里偏暖的下午。'],
          },
        ],
        cold: [
          {
            id: '0569', name: '皮夹克 + 工装裤', top: 'T 恤打底', bottom: '工装长裤：耐磨挡风',
            shoes: '靴子：挡风保暖，选平底的更好走', layer: '皮夹克：挡风保暖', acc: '毛线帽；眼镜；斜挎包',
            why: ['皮夹克挡风，冷天的早上很实用。', '毛线帽保暖，又不占地方。'],
          },
          {
            id: 'downvest', name: '羽绒马甲 + 卫衣 + 阔腿牛仔裤', top: '长袖卫衣 + 羽绒马甲：胸口和后背最暖', bottom: '宽松阔腿牛仔裤 + 皮带：挡风耐磨',
            shoes: '休闲鞋：好走又百搭', layer: '羽绒马甲：早上冷的时候穿，中午回暖就脱掉', acc: '墨镜',
            why: ['羽绒马甲轻薄保暖，冷的早上穿着，中午脱下也不占地方。', '阔腿牛仔裤挡风，排队站久了腿也不冷。'],
          },
          {
            id: 'bomber', name: '夹棉夹克 + 卫衣 + 卫裤', top: '连帽卫衣 + 夹棉短夹克：两层保暖，帽子能挡风', bottom: '宽松卫裤（加绒）：暖和舒服',
            shoes: '靴子：挡风保暖，选平底的更好走', layer: '夹棉短夹克：拉链可以拉开散热', acc: '毛线帽；手套',
            why: ['卫衣加夹棉夹克，是最冷那几天早上的穿法。', '毛线帽和手套让头和手都不冷，排队也不难熬。'],
          },
          {
            id: 'hoodvest', name: '连帽卫衣 + 棉马甲 + 工装裤', top: '连帽卫衣 + 棉马甲：一层层好调节，冷了拉上拉链', bottom: '宽松工装裤：口袋多，挡风',
            shoes: '运动鞋：好走，一天走两万步也不累', layer: '棉马甲：早上冷穿着，中午热了脱掉只剩卫衣', acc: '棒球帽',
            why: ['卫衣加马甲两层，温度变化时脱一层就行，比厚外套灵活。', '马甲不挡胳膊，拍照、玩项目都方便。'],
          },
        ],
        rain: {
          id: 'rain', name: '雨衣 + 速干短打', top: '速干短袖 T 恤：湿了也很快干', bottom: '速干运动短裤：不吸水',
          shoes: '凉鞋：不怕积水', layer: '透明一次性雨衣：比打伞方便', acc: '手机防水袋；斜挎包放在雨衣里面',
          why: ['热天下雨，速干面料最重要。', '凉鞋不怕地上积水。'],
        },
      },
    },
    // Reasons that depend on today's weather, appended under each outfit
    why: {
      band: '今天园内体感最高 {max}、最低 {min}，属于「{band}」天气。',
      warmFabric: '温暖天的面料可以比炎热天稍厚一点：纯棉、薄针织、牛仔这类，不用像亚麻那么薄，也不用毛呢那么厚。',
      warmAc: '虽然太阳没那么晒了，但环球的室内冷气开得很足（约 {u}），还是建议带一件薄外套以防万一；迪士尼室内没那么冷（约 {d}），可以不带。',
      rainLook: '今天{rain}，所以换成雨天穿搭；如果你会记得带伞，可以在上面选「我会带伞」，按温度来穿。',
      umbrella: '今天{rain}，你选了带伞，所以按温度来穿；记得出门带伞，包里再放一件一次性雨衣，排队人多时比打伞方便。',
      rainLikely: '降雨概率 {p}%，包里放一件一次性雨衣。',
      rainCool: '有雨但不热：换成防泼水的运动鞋，雨衣照样要带。',
      uv: '紫外线 {uv}（{level}），帽子和墨镜都要戴，防晒霜每 2 小时补一次。',
      humid: '湿度 {h}%，选速干、亚麻这类不贴身的面料。',
      humidDenim: '湿度 {h}%，牛仔会闷，可以换成棉麻或速干长裤。',
      evening: '晚上体感会降到 {t}，外层衣服别落下。',
      indoor: '室内空调约 {r}，比室外低 {gap}，进出时把外层穿上。',
    },
    bag: {
      poncho: '一次性雨衣 / 轻便雨披（园区人多，打伞不方便）',
      umbrella: '折叠伞（你选了带伞）',
      powerBank: '充电宝（排队时刷手机很耗电）',
      bottle: '可重复灌水的水瓶（园区有免费饮水机）',
      dryBag: '手机防水袋 / 密封袋',
      socks: '一双干袜子 + 塑料袋装湿衣服',
      sunscreen: 'SPF50 防晒霜（每 2 小时补一次）',
      fan: '手持小风扇 / 冰凉毛巾',
      antiChafe: '防磨膏（湿热天大腿和脚容易磨破）',
      warmers: '暖宝宝',
    },
    tip: {
      rainWindows: '降雨主要在 {w}，这段时间安排室内项目、表演或吃饭。',
      storm: '有雷暴：打雷时户外过山车和水上项目会暂停，雷暴一过通常就会恢复，这时候排队人最少。',
      orlando: '奥兰多夏秋季经常午后雷阵雨，大多在下午 2–5 点，一般 30–60 分钟就会停。',
      la: '南加州早上常有海雾（marine layer），中午才放晴，而且早晚温差大，洋葱式叠穿最实用。',
      waterWarm: '湿身项目放到最热的时候玩，衣服很快就会晒干。',
      waterCool: '天气偏凉，湿身项目最好穿雨衣，或者放到最后再玩。',
      windy: '最大风速约 {w} km/h，别戴宽檐帽，也别穿太飘的裙子。',
    },
  },

  en: {
    ui: {
      tagline: 'Check the weather, pick your park outfit',
      subtitle: 'What to wear to a theme park, based on live forecasts for Orlando and Los Angeles, with outfit ideas for women and men',
      language: 'Language',
      open: 'Arrive', close: 'Leave',
      today: 'Today', tomorrow: 'Tomorrow',
      weekdays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      loading: 'Fetching the forecast…',
      noData: 'No forecast data for these hours. Try another day.',
      fetchFail: 'The weather request failed (HTTP {s}). Refresh to try again.',
      networkFail: "Couldn't reach the weather service. Check your connection and refresh.",
      forecast: '16-day forecast', hourly: 'Hourly in the park', hi: 'H', lo: 'L', feelsMaxShort: 'Feels-like high',
      feelsLabel: '🌡️ Feels like', feelsNote: 'Low of {t} morning/evening',
      rainLabel: '🌧️ Chance of rain', rainNote: '{r} while you’re there',
      rainTimeLabel: '⏱️ Rain window', rainTimeNone: 'None',
      uvLabel: '☀️ UV index', uvLevels: ['Low', 'Moderate', 'High', 'Very high', 'Extreme'],
      humLabel: '💧 Humidity', humSticky: 'Muggy; wear quick-dry', humDry: 'Comfortably dry',
      windLabel: '💨 Wind', windNote: 'Peak wind in the park',
      disneyLabel: '🏰 Disney indoors', universalLabel: '🎬 Universal indoors', estNote: 'Estimate', estColderNote: 'Estimate · Colder',
      indoorNote: 'Parks don’t publish indoor temperatures. Indoor values are estimates; Universal usually runs colder than Disney.',
      legendRain: 'Chance of rain', legendTemp: 'Feels like', chartTip: '{h}:00 chance of rain {p}%',
      rainChoice: 'Rain today. How do you want to dress?', rainOutfit: '🧥 Rain outfit', umbrellaOutfit: '🌂 I’ll bring an umbrella, dress for the temperature',
      female: 'Her outfit', male: 'His outfit', why: 'Why this outfit', swap: 'Show another', bag: '🎒 Packing list', tips: '💡 Tips',
      top: 'Top', bottom: 'Bottoms', shoes: 'Shoes', layer: 'Outer layer', acc: 'Accessories',
      footer: 'Weather data from <a href="https://open-meteo.com/" target="_blank" rel="noopener">Open-Meteo</a>, up to 16 days ahead. Outfit ideas are generated by rules, so use your own judgment too.',
    },
    wmo: {
      0: 'Clear', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast', 45: 'Fog', 48: 'Freezing fog',
      51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle', 56: 'Freezing drizzle', 57: 'Freezing drizzle',
      61: 'Light rain', 63: 'Rain', 65: 'Heavy rain', 66: 'Freezing rain', 67: 'Freezing rain',
      71: 'Light snow', 73: 'Snow', 75: 'Heavy snow', 77: 'Snow grains',
      80: 'Showers', 81: 'Heavy showers', 82: 'Violent showers', 85: 'Snow showers', 86: 'Heavy snow showers',
      95: 'Thunderstorms', 96: 'Thunderstorms with hail', 99: 'Severe thunderstorms with hail',
    },
    cityShort: { orlando: 'Orlando', la: 'Los Angeles' },
    city: { orlando: 'Orlando', la: 'Los Angeles' },
    sep: '; ', listSep: ', ', dot: ' · ',
    heat: { scorch: 'Scorching', hot: 'Hot', warm: 'Warm', mild: 'Mild', cool: 'Cool', cold: 'Cold' },
    rain: { storm: 'Thunderstorms', heavy: 'Rain', likely: 'Chance of rain', low: 'Mostly dry' },
    key: { poncho: 'Bring a poncho', sun: 'Sun protection', layer: 'Bring a jacket', light: 'Pack light' },
    looks: {
      f: {
        hot: [
          {
            id: '0546', name: 'Cami + short-sleeve shirt + Bermudas', top: 'Cami + loose short-sleeve shirt worn open (cotton-linen): the cami breathes, the shirt adds a layer of shade', bottom: 'Knee-length Bermuda shorts (cotton): cool and coaster-proof',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'The shirt is your layer: button it for sun or indoor AC', acc: 'Baseball cap for shade; small belt bag for phone and tickets',
            why: ['Shorts beat skirts: no flashing on coasters, and you can sit anywhere in line.', 'An open short-sleeve shirt over a cami breathes and still blocks the sun.'],
          },
          {
            id: '0554', name: 'Cami + plaid shirt + linen wide-legs', top: 'Cami + plaid shirt worn open (thin cotton): the cami breathes, the shirt blocks sun', bottom: 'Linen wide-leg pants: light, breathable and quick to dry',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The plaid shirt is your layer, for sun and indoor AC', acc: 'Sunglasses; shoulder bag; compact umbrella for shade in line',
            why: ['A cami under an open shirt is the airiest combo, and the shirt blocks the sun.', 'Linen wide-legs are light, breathable and quick to dry, far cooler than jeans or cotton on humid days.'],
          },
          {
            id: '0548', name: 'Halter cami + flared skirt', top: 'Halter cami (cotton): bare shoulders stay cool at the hottest hour', bottom: 'Flared midi skirt with safety shorts: airy and coaster-proof',
            shoes: 'Flats: easy on your feet in long lines', layer: 'No jacket; keep a thin cardigan in your bag for indoor AC', acc: 'Hair clip; small crossbody bag',
            why: ['A halter cami leaves your shoulders free, so it stays cool at the hottest hour.', 'A flared skirt lets air through, and safety shorts make it coaster-proof.'],
          },
          {
            id: 'linen', name: 'Cami + linen shirt + cargo shorts', top: 'Cami + linen shirt worn open: linen is light, breathable and quick to dry, and the shirt shades you', bottom: 'Cargo shorts (cotton): cool, with pockets',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'The linen shirt is your layer: wear it in the sun and in indoor AC', acc: 'Bandana for sun and sweat; crossbody bag',
            why: ['A linen overshirt is the best layer for extreme heat: breathable, quick-drying, and it blocks most of the sun.', 'Shorts and sandals keep your legs and feet from overheating.'],
          },
          {
            id: 'mesh', name: 'Cami + mesh long-sleeve tee + wide-legs', top: 'Cami + open-knit mesh long-sleeve tee: the mesh breathes, the sleeves block sun', bottom: 'Loose wide-leg pants (light cotton): airy as you walk',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The mesh sleeves are your sun layer; no jacket needed', acc: 'Earrings; small bag',
            why: ['Open-knit mesh sleeves block sun yet breathe: less sunburn than short sleeves, cooler than regular long sleeves.', 'Loose wide-legs don’t cling, so every breeze cools you down.'],
          },
          {
            id: 'tencel', name: 'Linen long sleeves + Tencel skirt', top: 'Cami + linen long-sleeve overshirt: breathable sun cover', bottom: 'Tencel maxi skirt with safety shorts: drapes well and feels cool on skin',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'The linen sleeves are your sun layer', acc: 'Sunglasses; necklace; small crossbody bag',
            why: ['Tencel drapes, feels cool to the touch, and the skirt swings a breeze as you walk.', 'Linen sleeves cover your arms from the sun without trapping heat.'],
          },
          {
            id: 'poplin', name: 'Loose shirt + cotton-linen shorts', top: 'Loose cotton shirt, sleeves rolled: absorbs sweat, lets air through', bottom: 'High-waisted cotton-linen shorts: light and cool',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'No jacket; the long-sleeve shirt already shades you', acc: 'Sunglasses; small crossbody bag',
            why: ['A loose shirt stands off your body, so air flows in through the cuffs and hem.', 'Cotton-linen shorts are lighter than denim and stay comfortable when you sweat.'],
          },
          {
            id: 'linenset', name: 'Cami + linen shirt + linen wide-legs', top: 'Cami + loose linen shirt: light, breathable, quick-drying and sun-shading', bottom: 'Linen wide-leg pants: light and drapey, airy as you walk',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'The linen shirt is your layer, warm enough for indoor AC', acc: 'Necklace; small crossbody bag',
            why: ['Head-to-toe linen breathes everywhere, the most comfortable choice for humid heat.', 'The linen sleeves shade you; open it when hot, button it when cool.'],
          },
          {
            id: 'jorts', name: 'Ribbed tank + knee-length jorts', top: 'Ribbed tank (cotton): fitted but breathable', bottom: 'Loose knee-length denim shorts + belt: roomy, and long enough to be ride-safe',
            shoes: 'Flats: easy on your feet in long lines', layer: 'No jacket; keep a thin shirt in your bag for indoor AC', acc: 'Baseball cap; sunglasses; small shoulder bag',
            why: ['Loose knee-length jorts breathe better than tight shorts and stay put on coasters.', 'A cap and sunglasses protect your face and eyes in sunny lines.'],
          },
          {
            id: 'stripeshirt', name: 'Cami + striped shirt + bike shorts', top: 'Cami + loose striped shirt (cotton): airy and sun-shading', bottom: 'Fitted stretch shorts: easy to move in, ride-safe',
            shoes: 'Flats: easy on your feet in long lines', layer: 'The striped shirt is your layer; button it inside the AC', acc: 'Baseball cap; handbag',
            why: ['A loose shirt over stretch shorts: shade on top, cool below.', 'Stretch shorts make climbing in and out of rides easy.'],
          },
          {
            id: 'trackshorts', name: 'Striped shirt + track shorts', top: 'Loose striped long-sleeve shirt (cotton, sleeves rolled): shade and airflow', bottom: 'Track shorts (quick-dry): light and fast-drying',
            shoes: 'Flats: easy on your feet in long lines', layer: 'The shirt shades you; roll the sleeves down in strong sun', acc: 'Nothing extra; travel light',
            why: ['A loose long-sleeve shirt shades and breathes, less sun than short sleeves.', 'Quick-dry track shorts stay light even when you sweat.'],
          },
          {
            id: 'satincami', name: 'Satin cami + quick-dry wide-legs', top: 'Lace-trim acetate satin cami: smooth and cool, doesn’t cling', bottom: 'Quick-dry track wide-legs: light and fast-drying',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'No jacket; keep a thin cardigan in your bag for indoor AC', acc: 'Necklace; small shoulder bag',
            why: ['Acetate feels cool to the touch, very fresh in summer.', 'Quick-dry wide-legs breathe and shade your legs better than shorts.'],
          },
        ],
        warm: [
          {
            id: '0565', name: 'Graphic tee + straight jeans', top: 'Graphic tee (regular-weight cotton): absorbs sweat, a bit crisper than linen', bottom: 'Straight-leg jeans (mid-weight denim): tough and not too warm on mild days',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Pack a light layer for Universal; skip it at Disney', acc: 'Baseball cap for shade; backpack for poncho and power bank',
            why: ['The classic park look: easy sneakers and a backpack for your poncho and power bank.', 'The cap blocks the sun and looks great in photos.'],
          },
          {
            id: '0566', name: 'Cropped cardigan + wide-legs', top: 'Cropped tank + short cardigan (fine, light cotton knit): easy on, easy off', bottom: 'Elastic-waist wide-leg pants (cotton twill): loose and comfy in line',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The cardigan: tie it on when it’s hot, put it on inside Universal', acc: 'Leather crossbody bag',
            why: ['The cardigan carries this look from day to night.', 'Elastic-waist wide-legs are comfy for long lines and ride seats.'],
          },
          {
            id: '0545', name: 'Polo + skirt over pants', top: 'Striped polo (cotton piqué) + tie: breathes, and the collar shades your neck', bottom: 'Pleated mini skirt over wide-leg pants (poly-cotton): preppy and coaster-proof',
            shoes: 'Flats: easy on your feet in long lines', layer: 'Pack a light layer for Universal; skip it at Disney', acc: 'Hair clip; small handbag',
            why: ['A skirt over pants looks preppy and is completely coaster-proof.', 'The polo breathes, and the collar shades the back of your neck.'],
          },
          {
            id: '0553', name: 'Tee + A-line skirt', top: 'Sheer short-sleeve top + long thin scarf (light cotton): light enough for a warm day', bottom: 'A-line midi skirt (cotton blend) with safety shorts: moves easily, ride-safe',
            shoes: 'Flats: easy on your feet in long lines', layer: 'Pack a light layer for Universal; skip it at Disney', acc: 'Headband; belt; small crossbody bag',
            why: ['A simple palette always photographs well.', 'An A-line skirt moves easily, and safety shorts let you ride worry-free.'],
          },
          {
            id: '0555', name: 'Fitted tee + straight jeans', top: 'Fitted tee (regular-weight cotton): simple and fresh', bottom: 'High-waisted straight jeans (mid-weight denim) + thin belt: tough enough for lines and rides',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Pack a thin shirt or light layer for Universal; skip it at Disney', acc: 'Small crossbody bag with a plush charm',
            why: ['A bright top stands out in a crowd, so you’re easy to find if you get separated.', 'Straight jeans are tough enough for sitting in lines and climbing in and out of rides.'],
          },
          {
            id: '0556', name: 'Striped off-shoulder top + wide-legs', top: 'Striped off-shoulder long-sleeve top (thin cotton): long sleeves, light fabric', bottom: 'Elastic-waist wide-leg pants: easy to move in',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The long sleeves are your layer; add a cardigan if the evening gets cold', acc: 'Choker; crossbody bag',
            why: ['Long sleeves in a thin fabric suit the warmer afternoons of a cool day.', 'Bold stripes are easy to spot in a crowd and look sharp in photos.'],
          },
          {
            id: '0564', name: 'Dotted slip dress + cardigan', top: 'Slip dress (cotton) + short knit cardigan', bottom: 'Safety shorts under the dress',
            shoes: 'Boots: warm and windproof; flat soles walk best', layer: 'The cardigan: put it on when cool, tie it on when warm', acc: 'Glasses; necklace; small bag',
            why: ['A dress plus cardigan is an easy one-piece outfit for cool days.', 'Safety shorts underneath, and flat boots so walking stays comfortable.'],
          },
        ],
        cool: [
          {
            id: '0559', name: 'Striped sweater + wide jeans', top: 'Striped knit sweater + lace-hem layer: one piece keeps you warm', bottom: 'Wide-leg jeans: tough, not stuffy when it’s cool',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The sweater is warm enough; add a jacket on a chilly morning', acc: 'Crossbody bag (zips shut, safer than a tote)',
            why: ['One sweater covers the milder cool days without extra gear.', 'Wide-leg jeans are tough and don’t feel stuffy when it’s cool.'],
          },
          {
            id: '0561', name: 'Corduroy jacket + cargo pants', top: 'Fitted top + small neck scarf', bottom: 'Wide-leg cargo pants (cotton twill): pockets for phone and tickets',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Corduroy jacket: wear it in the morning, take it off when it warms up', acc: 'Belt; crossbody bag',
            why: ['A removable jacket fits cold mornings and warm middays.', 'Cargo pockets hold your phone, tickets and cash.'],
          },
          {
            id: '0550', name: 'Denim jacket + wide-legs', top: 'Turtleneck (thin knit)', bottom: 'High-waisted wide-leg jeans + belt',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Denim jacket: blocks wind, comes off when it warms up', acc: 'Sunglasses; shoulder bag',
            why: ['A denim jacket blocks wind and comes off easily on cool days.', 'A turtleneck under the jacket keeps your neck warm on chilly mornings.'],
          },
          {
            id: '0551', name: 'Cropped cardigan + dotted pleats', top: 'Knit top + short cardigan (knit)', bottom: 'Polka-dot pleated midi skirt with safety shorts',
            shoes: 'Flats: easy on your feet in long lines', layer: 'The cardigan: button it when cold, tie it on when warm', acc: 'Cat-eye sunglasses; beaded mini bag; belt',
            why: ['A cardigan over a knit top is easy to adjust as the temperature changes.', 'Safety shorts under the skirt keep rides worry-free.'],
          },
          {
            id: '0552', name: 'Knit cardigan + gingham maxi', top: 'Ruffle-collar blouse + knit cardigan: two layers, right for a cool day', bottom: 'Gingham tiered maxi skirt with safety shorts',
            shoes: 'Flats: easy on your feet in long lines', layer: 'The cardigan: wear it in the morning, take it off at midday', acc: 'Pigtails + clips; small handbag; charm necklace',
            why: ['Blouse plus cardigan is just right for a cool day.', 'The skirt ends above the ankle so you won’t trip, and safety shorts keep rides easy.'],
          },
          {
            id: '0562', name: 'Motif sweater + tie-waist trousers', top: 'Crewneck motif sweater (chunky knit): one piece keeps you warm', bottom: 'Tie-waist wide-leg trousers (wool blend): loose in ride seats',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Add a jacket on a cold morning', acc: 'Glasses; crossbody bag',
            why: ['One sweater is enough on the colder cool days.', 'Loose wide-leg trousers stay comfortable in ride seats.'],
          },
          {
            id: '0563', name: 'Short trench + mini skirt and boots', top: 'Turtleneck', bottom: 'Mini skirt with safety shorts',
            shoes: 'Boots: warm and windproof; flat soles walk best', layer: 'Stand-collar belted short trench: blocks wind, looks sharp belted', acc: 'Glasses; scarf; shoulder bag',
            why: ['A short trench blocks wind and looks sharp belted.', 'Always wear safety shorts under a mini; flat boots are the only kind that last all day.'],
          },
          {
            id: 'shellf', name: 'Shell jacket + tee + quick-dry wide-legs', top: 'Tee + light hooded shell jacket: windproof and shower-proof, zip up to block wind', bottom: 'Quick-dry cargo wide-legs: light, windproof, dry fast after a shower',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Shell jacket: zip up in the wind, stuff it in your backpack when it warms up', acc: 'Sunglasses; backpack',
            why: ['A light shell blocks wind and light rain and packs small, perfect for breezy cool days.', 'Quick-dry wide-legs match the shell: windproof and fast-drying if the weather turns.'],
          },
        ],
        cold: [
          {
            id: '0560', name: 'Toggle coat + wide-legs', top: 'Turtleneck + hoodie', bottom: 'Cuffed wide-leg pants (wool)',
            shoes: 'Boots: warm and windproof; flat soles walk best', layer: 'Hooded toggle coat (wool): long enough to keep your legs warm in line', acc: 'Gloves; crossbody bag',
            why: ['A longer coat keeps your legs warm while you stand in line.', 'Boots keep your feet warm while you stand in line.'],
          },
          {
            id: '0558', name: 'Long coat + sweater vest', top: 'Shirt + striped sweater vest (knit)', bottom: 'Midi skirt + thick tights: warm and ride-ready',
            shoes: 'Boots: warm and windproof; flat soles walk best', layer: 'Loose long coat (wool): drop just the coat when it warms up', acc: 'Plaid newsboy cap; small handbag',
            why: ['Shirt, vest and coat layer up; drop just the coat when it warms up.', 'Thick tights under the skirt keep you warm and ride-ready.'],
          },
        ],
        rain: {
          id: 'rain', name: 'Poncho + quick-dry basics', top: 'Quick-dry tee: dries fast when wet', bottom: 'Quick-dry running shorts: won’t soak up water',
          shoes: 'Sandals: airy, no sweaty feet', layer: 'Clear disposable poncho: easier than an umbrella', acc: 'Waterproof phone pouch; small bag under the poncho',
          why: ['In warm rain, quick-dry clothes dry fast; wet denim stays wet all day.', 'Sandals don’t mind puddles and your feet stay fresh after.'],
        },
      },
      m: {
        hot: [
          {
            id: '0571', name: 'Tee + fluid wide-legs', top: 'Loose tee (cotton): absorbs sweat, breathes', bottom: 'Fluid wide-leg pants (lightweight): airy as you walk',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'No jacket; bring a thin shirt if indoor AC bothers you', acc: 'Sunglasses; crossbody bag',
            why: ['A loose tee and fluid wide-legs never cling, so you stay fresh in the heat.', 'Wide-legs shade your legs better than shorts.'],
          },
          {
            id: '0574', name: 'Tee + shorts', top: 'Tee (cotton): simple and breathable', bottom: 'Shorts (cotton): cool',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'No jacket; bring a thin shirt if indoor AC bothers you', acc: 'Baseball cap; sunglasses; tote',
            why: ['Tee and shorts is the easiest hot-day combo.', 'A cap and sunglasses protect your face and eyes in sunny lines.'],
          },
          {
            id: '0573', name: 'Open shirt + denim shorts', top: 'Tee + thin shirt worn open (cotton): sun cover you can button indoors', bottom: 'Denim shorts: tough and easy to move in',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The shirt is your layer: button it inside the AC', acc: 'Crossbody bag',
            why: ['An open thin shirt blocks sun and breathes; button it up indoors.', 'Shorts and sneakers make a long day easy.'],
          },
          {
            id: '0572', name: 'Striped shirt + shorts', top: 'Striped long-sleeve shirt (cotton, sleeves rolled): shade and airflow', bottom: 'Shorts (cotton): cool',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The shirt shades you; roll the sleeves down in strong sun', acc: 'Tote',
            why: ['Roll the sleeves up to cool off, down for shade.', 'Shorts keep your legs cool.'],
          },
          {
            id: '0578', name: 'Oversized tee + wide-legs', top: 'Oversized tee (cotton): loose and airy', bottom: 'Loose wide-leg pants (lightweight): airy and shady',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'No jacket; bring a thin shirt if indoor AC bothers you', acc: 'Sunglasses; backpack for poncho and power bank',
            why: ['An oversized tee stands off your body, so sweat doesn’t get trapped.', 'Loose wide-legs breathe and shade your legs better than shorts.'],
          },
          {
            id: 'tankdye', name: 'Tank + shirt at the waist + shorts', top: 'Tank (cotton): the most breathable top', bottom: 'Frayed shorts (cotton): cool and easy to move in',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Long-sleeve shirt tied at the waist: put it on inside the AC', acc: 'Necklace; camera',
            why: ['A tank breathes best, and the shirt at your waist is ready for indoor AC.', 'Shorts and sneakers keep you going all day.'],
          },
          {
            id: 'crochet', name: 'Tank + crochet shirt + shorts', top: 'Tank + open crochet shirt: the open knit lets air through and still shades', bottom: 'Printed shorts (cotton): cool',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'The crochet shirt is your sun layer', acc: 'Straw wide-brim hat; sunglasses; necklace',
            why: ['An open crochet shirt is cooler than a regular one and still blocks some sun.', 'A straw wide-brim hat shades a lot and breathes.'],
          },
          {
            id: 'resort', name: 'Tank + camp shirt + athletic shorts', top: 'Tank + printed short-sleeve shirt worn open (lightweight): airy', bottom: 'Mesh athletic shorts: breathable and quick to dry',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The short-sleeve shirt is your layer', acc: 'Baseball cap; sunglasses',
            why: ['Mesh athletic shorts breathe and dry fast, even when you sweat.', 'An open short-sleeve shirt lets air in and blocks a bit of sun.'],
          },
          {
            id: 'drape', name: 'Tank + tee over the shoulder + shorts', top: 'Tank (cotton) + a tee draped over the shoulder: tank outside, tee on indoors', bottom: 'Shorts (cotton): cool',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'The draped tee: pull it on inside the AC', acc: 'Baseball cap; crossbody bag; necklace',
            why: ['A tank plus a tee you can throw on keeps you cool outside and warm enough inside.', 'Sandals keep your feet from overheating.'],
          },
          {
            id: 'knitvest', name: 'Crochet vest + linen pants', top: 'Tank + open crochet knit vest: layered but airy', bottom: 'Linen drawstring wide-legs: light, breathable and quick to dry',
            shoes: 'Sandals: airy, no sweaty feet', layer: 'No jacket needed', acc: 'Straw hat; sunglasses; necklace',
            why: ['Linen pants are light and airy, and shade your legs better than shorts.', 'An open-knit vest adds layers without adding heat.'],
          },
          {
            id: 'sporty', name: 'Sleeveless tee + 2-in-1 shorts', top: 'Loose sleeveless tee (cotton): open sides keep you fresh at the hottest hour', bottom: '2-in-1 shorts: built-in liner, ride-safe and easy to climb in',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'No jacket; bring a thin tee if indoor AC bothers you', acc: 'Headband for sweat; bracelets; iced drink',
            why: ['A loose sleeveless tee vents at the sides, cooler than a regular tee but less casual than a tank.', 'A headband keeps sweat out of your eyes in sunny lines.'],
          },
        ],
        warm: [
          {
            id: '0567', name: 'Striped shirt + straight jeans', top: 'Tee + striped shirt worn open (cotton poplin): airy, button it when cool', bottom: 'Straight jeans (mid-weight denim) + belt: tough',
            shoes: 'Casual shoes: walkable and easy to match', layer: 'The shirt is your layer; button it inside Universal', acc: 'Necklace',
            why: ['An open shirt breathes; button it up when it cools down.', 'Straight jeans are tough enough for sitting in line.'],
          },
          {
            id: '0570', name: 'Light cardigan + tee + jeans', top: 'Tee (cotton) + fine-knit thin cardigan: light and drapey, easy on and off', bottom: 'Straight jeans (mid-weight denim): tough',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The cardigan: take it off when warm, put it on inside Universal', acc: 'Sunglasses',
            why: ['A light cardigan comes on and off easily on warm days.', 'A simple outfit that stays comfortable all day.'],
          },
          {
            id: '0575', name: 'Shirt + neckerchief + jeans', top: 'Long-sleeve shirt (cotton, a little heavier than a summer shirt) + small neckerchief: roll the sleeves to cool off', bottom: 'Straight jeans (mid-weight denim) + belt: tough',
            shoes: 'Casual shoes: walkable and easy to match', layer: 'The shirt is your layer; pack a light jacket for Universal', acc: 'Crossbody bag',
            why: ['Roll the sleeves up to cool down, down to block wind.', 'The neckerchief adds a detail that looks great in photos.'],
          },
          {
            id: 'layered', name: 'Layered tee + cargo shorts', top: 'Tee over a long-sleeve layer (cotton): covered for cool mornings and evenings', bottom: 'Camo cargo shorts (cotton twill): pockets, and cool legs',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Pack a light layer for Universal; skip it at Disney', acc: 'Backwards cap; sunglasses',
            why: ['A tee over long sleeves suits cool mornings and evenings.', 'Cargo shorts add pockets and keep your legs cool.'],
          },
        ],
        cool: [
          {
            id: '0568', name: 'Sweater + shirt + cargo pants', top: 'Shirt + crewneck sweater (knit): wear it cold, strip down to the shirt when warm', bottom: 'Cargo pants (cotton twill): lots of pockets',
            shoes: 'Casual shoes: walkable and easy to match', layer: 'The sweater is your warm layer; take it off at midday', acc: 'Beanie; coffee',
            why: ['A shirt under a sweater: add or drop a layer as the day changes.', 'A beanie keeps you warm in the morning and packs small.'],
          },
          {
            id: '0576', name: 'Jacket + sweater on shoulders + chinos', top: 'Tee + jacket, with a sweater over the shoulders', bottom: 'Chinos (cotton twill): comfy for walking',
            shoes: 'Casual shoes: walkable and easy to match', layer: 'The jacket blocks wind; pull on the sweater if it gets colder', acc: 'Crossbody bag; key charm',
            why: ['Jacket plus sweater gives two warm layers you can peel off one by one.', 'Chinos are comfy for a full day of walking.'],
          },
          {
            id: '0577', name: 'Half-zip pullover + cargo pants', top: 'Half-zip pullover (loopback cotton): unzip to cool down', bottom: 'Cargo pants: tough and windproof',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'The pullover is warm enough; add a jacket on a cold morning', acc: 'Baseball cap; sunglasses',
            why: ['A half-zip lets you vent heat as the temperature changes.', 'Cargo pants are tough and block the wind.'],
          },
          {
            id: 'shell', name: 'Shell jacket + tank + knee-length shorts', top: 'Tank + light hooded shell jacket: windproof and shower-proof, zip up to block wind', bottom: 'Loose knee-length shorts (drapey fabric): keeps your legs from overheating',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Shell jacket: zip up in the wind, pack it away when it warms up', acc: 'Necklace',
            why: ['A light shell blocks wind and light rain and packs small, perfect for breezy cool days.', 'Covered on top, shorts below: right for the warmer afternoons of a cool day.'],
          },
        ],
        cold: [
          {
            id: '0569', name: 'Leather jacket + cargo pants', top: 'Tee base layer', bottom: 'Cargo pants: tough and windproof',
            shoes: 'Boots: warm and windproof; flat soles walk best', layer: 'Leather jacket: blocks wind, keeps you warm', acc: 'Beanie; glasses; crossbody bag',
            why: ['A leather jacket blocks the wind on cold mornings.', 'A beanie adds warmth without taking up space.'],
          },
          {
            id: 'downvest', name: 'Down vest + sweatshirt + wide jeans', top: 'Long-sleeve sweatshirt + down vest: warmest where it counts', bottom: 'Loose wide-leg jeans + belt: windproof and tough',
            shoes: 'Casual shoes: walkable and easy to match', layer: 'Down vest: wear it in the cold morning, take it off by midday', acc: 'Sunglasses',
            why: ['A down vest is light and warm for cold mornings and packs small by noon.', 'Wide-leg jeans block wind while you stand in line.'],
          },
          {
            id: 'bomber', name: 'Padded jacket + hoodie + sweatpants', top: 'Hoodie + padded short jacket: two warm layers, and the hood blocks wind', bottom: 'Loose fleece sweatpants: warm and comfy',
            shoes: 'Boots: warm and windproof; flat soles walk best', layer: 'Padded jacket: unzip it to cool down', acc: 'Beanie; gloves',
            why: ['Hoodie plus padded jacket is the outfit for the coldest mornings.', 'A beanie and gloves keep your head and hands warm through long lines.'],
          },
          {
            id: 'hoodvest', name: 'Hoodie + padded vest + cargo pants', top: 'Hoodie + padded vest: easy to layer, zip up when cold', bottom: 'Loose cargo pants: pockets, windproof',
            shoes: 'Sneakers: comfy for 20,000+ steps', layer: 'Padded vest: wear it on a chilly morning, take it off at midday', acc: 'Baseball cap',
            why: ['A hoodie plus a vest lets you drop one layer as it warms up, more flexible than a heavy coat.', 'A vest leaves your arms free for photos and rides.'],
          },
        ],
        rain: {
          id: 'rain', name: 'Poncho + quick-dry basics', top: 'Quick-dry tee: dries fast when wet', bottom: 'Quick-dry athletic shorts: won’t soak up water',
          shoes: 'Sandals: fine in puddles', layer: 'Clear disposable poncho: easier than an umbrella', acc: 'Waterproof phone pouch; crossbody under the poncho',
          why: ['In warm rain, quick-dry fabric matters most.', 'Sandals don’t mind puddles.'],
        },
      },
    },
    why: {
      band: 'Today feels like {max} at the warmest and {min} at the coolest in the park: a “{band}” day.',
      warmFabric: 'Fabrics can be a touch heavier than on hot days: cotton, fine knits and denim, not as thin as linen and nowhere near wool.',
      warmAc: 'The sun is gentler now, but Universal runs its AC hard indoors (about {u}), so bring a light layer just in case; Disney is milder inside (about {d}), so you can skip it there.',
      rainLook: 'Expect {rain} today, so this is the rain version; if you’ll remember an umbrella, pick “I’ll bring an umbrella” above to dress for the temperature instead.',
      umbrella: 'Expect {rain} today; since you’re bringing an umbrella, this outfit follows the temperature. Keep a disposable poncho in your bag too: it’s easier than an umbrella in crowded lines.',
      rainLikely: '{p}% chance of rain: keep a disposable poncho in your bag.',
      rainCool: 'Rain but not warm: switch to water-resistant sneakers and still bring a poncho.',
      uv: 'UV index {uv} ({level}): wear a hat and sunglasses, and reapply sunscreen every 2 hours.',
      humid: '{h}% humidity: choose quick-dry or linen fabrics that don’t cling.',
      humidDenim: '{h}% humidity makes denim stuffy; swap in linen or quick-dry pants.',
      evening: 'It drops to about {t} in the evening, so don’t leave your layer behind.',
      indoor: 'Indoor AC runs about {r}, {gap} cooler than outside; put your layer on when you go in.',
    },
    bag: {
      poncho: 'Disposable rain poncho (umbrellas are awkward in crowded parks)',
      umbrella: 'Compact umbrella (you chose to bring one)',
      powerBank: 'Power bank (phones drain fast in long queues)',
      bottle: 'Refillable water bottle (parks have free water fountains)',
      dryBag: 'Waterproof phone pouch or zip-top bag',
      socks: 'Spare dry socks + a plastic bag for wet clothes',
      sunscreen: 'SPF 50 sunscreen (reapply every 2 hours)',
      fan: 'Handheld fan or cooling towel',
      antiChafe: 'Anti-chafing balm (humid heat causes chafing and blisters)',
      warmers: 'Hand warmers',
    },
    tip: {
      rainWindows: 'Rain is most likely {w}. Plan indoor rides, shows or meals for then.',
      storm: 'Thunderstorms expected: outdoor coasters and water rides pause for lightning. They usually reopen once it passes, and that’s when lines are shortest.',
      orlando: 'Orlando often gets afternoon thunderstorms, mostly between 2 and 5 pm, and they usually clear within 30 to 60 minutes.',
      la: 'Southern California mornings often start under marine-layer clouds that burn off by midday, and nights get much cooler, so wear layers.',
      waterWarm: 'Save water rides for the hottest part of the day; you’ll dry off fast.',
      waterCool: 'It’s cool out, so wear a poncho on water rides or save them for last.',
      windy: 'Winds up to about {w} km/h: skip wide-brim hats and flowy skirts.',
    },
  },
};

function detectLang() {
  let saved = null;
  try { saved = localStorage.getItem('lang'); } catch { /* storage unavailable */ }
  if (saved && I18N[saved]) return saved;
  for (const l of navigator.languages || [navigator.language || '']) {
    const base = l.toLowerCase().split('-')[0];
    if (I18N[base]) return base;
  }
  return 'en';
}

let currentLang = detectLang();

function setLang(lang) {
  currentLang = lang;
  try { localStorage.setItem('lang', lang); } catch { /* storage unavailable */ }
}

// t('top.hot.f'), t('tip.humid', { h: 80 }). Falls back to English, then to the key itself.
function t(key, vars = {}) {
  const lookup = (lang) => key.split('.').reduce((o, k) => (o == null ? o : o[k]), I18N[lang]);
  const v = lookup(currentLang) ?? lookup('en') ?? key;
  return typeof v === 'string' ? v.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '') : v;
}
