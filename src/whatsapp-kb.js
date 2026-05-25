'use strict';

const ZHENGJI_PROFILE = Object.freeze({
  companyName: 'ZHENG JI WELLNESS SDN. BHD.',
  ssm: '202501054525 (1655931-A)',
  address: 'Block C, The Five@KPD, Suite C-2-2, Aras 1, 49, Jalan Dungun, Bukit Damansara, 50490 Kuala Lumpur',
  hours: 'Monday-Sunday 11:00-20:00',
  phone: '+60-17-865 1050',
  principal: 'Dr. Wei Renfa / 韦任法'
});

const SERVICES = Object.freeze({
  meridian: [
    { name: '头部经络调理', duration: '30分钟', price: 'RM 98' },
    { name: '颈椎经络调理', duration: '25分钟', price: 'RM 168' },
    { name: '腰部经络调理', duration: '30分钟', price: 'RM 198' },
    { name: '背部经络调理', duration: '45分钟', price: 'RM 298' },
    { name: '肠胃调理', duration: '45分钟', price: 'RM 298' },
    { name: '中式古法经络调理·全身', duration: '60分钟', price: 'RM 398' },
    { name: '办公室白领综合征', duration: '70分钟', price: 'RM 480' }
  ],
  special: [
    { name: '青少年脊柱侧弯调整', price: 'RM 580/次' },
    { name: '徒手面部精雕', price: 'RM 880/次' },
    { name: '产后骨盆修复', price: 'RM 650/次' },
    { name: '中医减脂祛湿调理', price: 'RM 480/次' }
  ],
  drWei: [
    { name: '脊椎调理', price: 'RM 1,200', memberPrice: 'RM 600' },
    { name: '盆骨调整', price: 'RM 1,280' },
    { name: '富贵包修复', price: 'RM 980' },
    { name: '小颜面部调整', price: 'RM 1,680' }
  ]
});

const AUTO_REPLIES = Object.freeze([
  {
    id: 'welcome_zh',
    category: 'welcome',
    language: 'zh',
    keywords: ['你好', 'hi', 'hello', '咨询', '了解', '正脊堂'],
    reply: '您好，欢迎来到正脊堂！🌿\n我们专注于中医整脊与脊柱健康调理，源自韦氏整脊疗法，纯手工、温和调理、注重安全与舒适。\n请问您目前有哪里不舒服，或有什么想了解的呢？'
  },
  {
    id: 'welcome_en',
    category: 'welcome',
    language: 'en',
    keywords: ['hi', 'hello', 'appointment', 'consult', 'zheng ji'],
    reply: 'Hi, welcome to Zheng Ji Wellness! 🌿\nWe specialise in TCM spinal care — hands-on, gentle, and personalised.\nWhat can we help you with today?'
  },
  {
    id: 'welcome_ms',
    category: 'welcome',
    language: 'ms',
    keywords: ['hai', 'selamat', 'temujanji', 'rawatan'],
    reply: 'Hai, selamat datang ke Zheng Ji Wellness! 🌿\nKami pakar dalam penjagaan tulang belakang TCM — rawatan tangan, lembut dan disesuaikan mengikut keadaan pelanggan.\nBoleh kami bantu anda hari ini?'
  },
  {
    id: 'hours',
    category: 'info',
    language: 'zh',
    keywords: ['几点', '营业', '开门', '关门', '时间', 'hours', 'open'],
    reply: '我们每天都营业，营业时间是早上 11点 到晚上 8点（11:00–20:00）。\n包括周末和公共假期都照常开门，欢迎随时预约！😊'
  },
  {
    id: 'address',
    category: 'info',
    language: 'zh',
    keywords: ['地址', '在哪里', '哪里', '导航', 'location', 'address', 'map'],
    reply: '我们位于：\nBlock C, The Five@KPD, Suite C-2-2, Aras 1\n49, Jalan Dungun, Bukit Damansara, KL\n\n在 Wisma UOA II 附近，Bukit Damansara 一带。需要导航链接的话随时告诉我！🗺️'
  },
  {
    id: 'services',
    category: 'services',
    language: 'zh',
    keywords: ['服务', '项目', '价钱', '价格', '收费', '多少钱', 'price', 'service'],
    reply: '我们的服务分两个系列：\n\n经络调理系列 🌿\n• 头部经络调理（30分钟）—— RM 98\n• 颈椎经络调理（25分钟）—— RM 168\n• 腰部经络调理（30分钟）—— RM 198\n• 背部经络调理（45分钟）—— RM 298\n• 肠胃调理（45分钟）—— RM 298\n• 中式古法经络调理·全身（60分钟）—— RM 398\n• 办公室白领综合征（70分钟）—— RM 480\n\n专项调理系列 ✨\n• 青少年脊柱侧弯调整 —— RM 580/次\n• 徒手面部精雕 —— RM 880/次\n• 产后骨盆修复 —— RM 650/次\n• 中医减脂祛湿调理 —— RM 480/次'
  },
  {
    id: 'dr_wei_price',
    category: 'services',
    language: 'zh',
    keywords: ['韦医生', 'wei', 'doctor', '专家', '主理人'],
    reply: '韦任法医生的专家诊疗收费：\n\n• 脊椎调理 —— RM 1,200（会员价 RM 600）\n• 盆骨调整 —— RM 1,280\n• 富贵包修复 —— RM 980\n• 小颜面部调整 —— RM 1,680\n\n韦医生是韦仕正手法创始人、龙氏手法传人，名额有限，建议提前预约哦。'
  },
  {
    id: 'neck_pain',
    category: 'symptom',
    language: 'zh',
    keywords: ['颈椎', '脖子', 'neck', '肩颈', '颈痛'],
    reply: '可以的！颈椎问题是我们核心专项之一。\n韦氏整脊疗法通过手法调理，帮助改善颈椎紧张、活动受限和不适感。\n很多客户调理后会感觉轻松不少。\n方便的话我帮你安排一个预约时间，让老师先了解一下情况？😊'
  },
  {
    id: 'back_pain',
    category: 'symptom',
    language: 'zh',
    keywords: ['腰痛', '腰椎', '腰酸', 'back pain', 'disc', '突出'],
    reply: '可以先来评估。腰部经络调理和脊椎调理都适合做初步了解。\n韦医生从事脊椎病诊疗近20年，对颈腰椎相关问题有丰富经验。\n建议先做一个脊椎检测，让我们了解您的具体情况后再制定方案。'
  },
  {
    id: 'postpartum',
    category: 'symptom',
    language: 'zh',
    keywords: ['产后', '骨盆', '盆骨', '妈妈', 'postpartum', 'pelvic'],
    reply: '可以！我们有专门的产后骨盆修复疗程（RM 650/次）。\n通过手法调理帮助改善产后体态、腰酸背痛、骨盆前后倾、高低肩、长短腿等问题。\n很多妈妈反馈调理后体态和舒适度都有改善。\n要预约的话告诉我什么时间方便？🌸'
  },
  {
    id: 'scoliosis',
    category: 'symptom',
    language: 'zh',
    keywords: ['侧弯', '脊柱侧弯', '小孩', '孩子', '青少年', 'scoliosis'],
    reply: '有的，我们有青少年脊柱侧弯专项调理（RM 580/次）。\n韦医生在青少年脊柱侧弯方面有丰富临床经验。\n建议带孩子来做一个初步评估，越早了解情况，越容易制定合适的调理方案。'
  },
  {
    id: 'office_worker',
    category: 'symptom',
    language: 'zh',
    keywords: ['上班族', '办公室', '电脑', '久坐', '白领', '肩很紧'],
    reply: '太了解了！我们特别为上班族设计了【办公室白领综合征】疗程（70分钟，RM 480）。\n会针对颈肩腰的痛点，结合全身筋膜调理做加强，同时搭配中药膏和温灸热敷包。\n很多白领客户每月来一次，当成日常保养。😄'
  },
  {
    id: 'headache_sleep',
    category: 'symptom',
    language: 'zh',
    keywords: ['头痛', '头晕', '失眠', '睡眠', 'headache', 'dizzy'],
    reply: '有些头痛、头晕、睡眠不佳，可能和颈椎紧张、姿势压力或经络不通有关。\n我们会先了解您的情况，再判断是否适合做颈椎调理。\n欢迎来做个检测，我们帮您初步评估。'
  },
  {
    id: 'doctor_profile',
    category: 'brand',
    language: 'zh',
    keywords: ['资质', '医生', '背景', '厉害', '专业', '资格'],
    reply: '我们的主诊是韦任法医生，资历非常扎实：\n✅ 毕业于广州医科大学\n✅ 龙氏手法传人\n✅ 韦仕正手法创始人（独创专利）\n✅ 广东中医学院脊椎康复专家\n✅ 国际中医药联盟总会副主席\n✅ 世界脊柱联盟理事\n✅ 国际针灸推拿手法比赛金奖\n✅ 世界脊柱联盟大会【金脊奖】得主\n从事脊椎病诊疗近20年，临床案例数以万计。'
  },
  {
    id: 'massage_difference',
    category: 'brand',
    language: 'zh',
    keywords: ['按摩', '区别', '普通按摩', 'massage', '不同'],
    reply: '区别挺大的：\n我们是中医整脊与脊柱健康调理，不是普通按摩放松。\n韦氏整脊疗法针对脊椎、体态和经络问题做手法调理，同时疏通经络气血。\n不靠药物，不靠仪器硬拉，注重纯手工调理，整体更有针对性。\n目标不是单纯放松，而是帮助改善问题来源。'
  },
  {
    id: 'booking',
    category: 'booking',
    language: 'zh',
    keywords: ['预约', 'booking', 'book', '安排', '时间', 'slot'],
    reply: '预约很简单！直接告诉我：\n1️⃣ 您想做哪个项目\n2️⃣ 方便的日期和时间\n\n我们营业时间是每天 11:00–20:00，我帮您确认并安排好。😊'
  },
  {
    id: 'human_handoff',
    category: 'handoff',
    language: 'zh',
    keywords: ['投诉', '严重', '紧急', '负责人', '人工', 'special request', 'complaint'],
    reply: '您好，感谢您的问题，这个情况我需要为您转接给我们的专员进一步了解。\n请稍等，我们会尽快联系您，或者您也可以直接拨打：+60-17-865 1050 😊'
  }
]);

const TEMPLATES = Object.freeze({
  appointmentConfirmation: '好的，已为您登记！\n📅 日期：[DATE]\n⏰ 时间：[TIME]\n💆 项目：[SERVICE]\n📍 地址：Block C, The Five@KPD, Suite C-2-2, Aras 1, 49 Jalan Dungun, Bukit Damansara, KL\n\n如有任何变动请提前告知，期待见到您！🌿',
  reminder24h: '[NAME] 您好！温馨提醒，您明天在正脊堂的预约：\n⏰ [TIME]，项目：[SERVICE]\n📍 Block C, The Five@KPD, Suite C-2-2, Jalan Dungun, Bukit Damansara\n如需更改时间请提前联系我们，期待明天见到您！🌿',
  reminder2h: '[NAME] 您好！您今天 [TIME] 的预约再过2小时就要开始了，请预留好出门时间哦😊\n如有任何问题随时联系我们：+60-17-865 1050',
  aftercareSameDay: '[NAME] 您好！感谢今天来到正脊堂💚\n调理后建议：\n• 今天多喝温水，帮助代谢\n• 避免剧烈运动24小时\n• 保持正确坐姿，不要长时间低头\n如有任何不适或问题随时联系我们。期待下次见到您！🌿',
  followUp7d: '[NAME] 您好！上次调理到今天刚好一周了😊\n请问身体感觉怎么样？有没有改善？\n如果有任何问题欢迎告诉我们。建议定期调理效果会更稳定哦，需要我帮您安排下一次吗？',
  inactive30d: '[NAME] 您好，好久不见！🌿\n最近身体怎么样？脊椎和体态有没有需要保养的地方？\n我们近期有 [PROMO] 活动，欢迎回来继续调理，保持健康状态😊',
  review3d: '[NAME] 您好！请问上次在正脊堂的体验满意吗？😊\n如果您觉得有帮助，非常感谢您在 Google 留下一个评价，对我们帮助很大：\n👉 [Google Review Link]\n您的支持是我们最大的动力！🌿正脊堂 敬上'
});

module.exports = { ZHENGJI_PROFILE, SERVICES, AUTO_REPLIES, TEMPLATES };
