<template>
  <div class="out-home">
    <el-header class="header" :class="{ 'header-scrolled': isScrolled }">
      <div class="header-content">
        <div class="logo" @click="scrollToSection('hero')">智客 CRM</div>
        <div class="nav-center">
          <el-button
            v-for="item in navItems"
            :key="item.key"
            :type="currentSection === item.key ? 'primary' : ''"
            text
            class="nav-item"
            @click="scrollToSection(item.key)"
          >
            {{ item.label }}
          </el-button>
        </div>
        <div class="nav-right">
          <template v-if="!isLoggedIn">
            <el-button type="primary" @click="goToLogin">登录</el-button>
            <el-button @click="goToRegister">注册</el-button>
          </template>
          <template v-else>
            <el-button type="primary" @click="goToDashboard">进入系统</el-button>
            <el-button @click="handleLogout">退出登录</el-button>
          </template>
        </div>
      </div>
    </el-header>

    <section id="hero" class="section hero-section">
      <div class="hero-content">
        <div class="hero-bg"></div>
        <div class="hero-text">
          <el-badge type="success" class="hero-badge">专业企业级CRM系统</el-badge>
          <h1 class="hero-title">智客 CRM</h1>
          <p class="hero-subtitle">智能客户关系管理平台<br/>助力企业实现数字化转型</p>
          <div class="hero-buttons">
            <el-button type="primary" size="large" @click="goToLogin">免费试用</el-button>
            <el-button size="large" @click="scrollToSection('features')">了解更多</el-button>
          </div>
          <div class="hero-stats">
            <div class="stat-item">
              <span class="stat-number">10,000+</span>
              <span class="stat-label">企业用户</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">500万+</span>
              <span class="stat-label">客户数据</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat-item">
              <span class="stat-number">99.9%</span>
              <span class="stat-label">系统稳定性</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-card card-1">
            <el-icon :size="32"><User /></el-icon>
            <span>客户管理</span>
          </div>
          <div class="floating-card card-2">
            <el-icon :size="32"><TrendCharts /></el-icon>
            <span>数据分析</span>
          </div>
          <div class="floating-card card-3">
            <el-icon :size="32"><ChatLineSquare /></el-icon>
            <span>智能跟进</span>
          </div>
        </div>
      </div>
    </section>

    <section id="features" class="section features-section">
      <div class="section-content">
        <div class="section-header">
          <el-badge type="info" class="section-badge">核心功能</el-badge>
          <h2 class="section-title">全方位客户管理解决方案</h2>
          <p class="section-desc">整合客户信息、跟进记录、数据分析，打造一站式CRM平台</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-card" v-for="(feature, index) in features" :key="index">
            <div class="feature-icon" :style="{ background: feature.gradient }">
              <component :is="feature.icon" :size="36" />
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.desc }}</p>
            <div class="feature-tags">
              <el-tag v-for="tag in feature.tags" :key="tag" size="small">{{ tag }}</el-tag>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="about" class="section about-section">
      <div class="section-content">
        <div class="about-grid">
          <div class="about-left">
            <div class="about-text-block">
              <p class="about-text">
                智客CRM成立于2018年，专注为中小企业提供专业的客户关系管理解决方案。
                我们深知客户是企业发展的核心，致力于通过技术创新帮助企业提升客户管理效率，实现业绩增长。
              </p>
            </div>

            <div class="values-section">
              <h3 class="values-title">核心价值观</h3>
              <div class="values-grid">
                <div class="value-card" v-for="(value, index) in values" :key="index">
                  <div class="value-icon-wrapper">
                    <el-icon :size="32" class="value-icon"><component :is="value.icon" /></el-icon>
                  </div>
                  <span class="value-text">{{ value.text }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="about-right">
            <div class="about-image-wrapper">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=700&h=500&fit=crop&q=80" alt="团队协作" />
              <div class="image-decoration"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="contact" class="section contact-section">
      <div class="section-content">
        <div class="contact-header">
          <el-badge type="success" class="section-badge">联系我们</el-badge>
          <h2 class="section-title">与我们取得联系</h2>
          <p class="section-desc">专业团队随时为您答疑解惑，期待与您建立合作</p>
        </div>

        <div class="contact-container">
          <div class="contact-left">
            <div class="contact-intro">
              <h3>保持联系</h3>
              <p>无论您有任何疑问、合作意向或技术支持需求，我们的专业团队都将在24小时内为您回复。</p>
            </div>

            <div class="contact-cards">
              <div class="contact-card" v-for="(item, index) in contactInfo" :key="index">
                <div class="card-icon" :style="{ background: item.color }">
                  <component :is="item.icon" :size="28" />
                </div>
                <div class="card-content">
                  <span class="card-label">{{ item.label }}</span>
                  <span class="card-value">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="contact-right">
            <div class="contact-image">
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80" alt="团队协作" />
              <div class="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <el-footer class="footer">
      <div class="footer-content">
        <div class="footer-top">
          <div class="footer-brand">
            <div class="footer-logo">智客 CRM</div>
            <p class="footer-desc">专业的客户关系管理系统</p>
          </div>
          <div class="footer-links">
            <div class="footer-link-group">
              <h4>产品</h4>
              <a href="#" @click.prevent="scrollToSection('features')">功能介绍</a>
              <a href="#" @click.prevent="scrollToSection('about')">关于我们</a>
              <a href="#" @click.prevent="scrollToSection('contact')">联系方式</a>
            </div>
            <div class="footer-link-group">
              <h4>支持</h4>
              <a href="#">帮助中心</a>
              <a href="#">API文档</a>
              <a href="#">常见问题</a>
            </div>
            <div class="footer-link-group">
              <h4>法律</h4>
              <a href="#">隐私政策</a>
              <a href="#">服务条款</a>
              <a href="#">安全说明</a>
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; 2026 智客 CRM. All rights reserved.</p>
        </div>
      </div>
    </el-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import {
  User, TrendCharts, ChatLineSquare, OfficeBuilding, Phone, Message, Location,
  Trophy, Star, CircleCheck, Timer, MagicStick, Position
} from '@element-plus/icons-vue'

const router = useRouter()

const isLoggedIn = computed(() => !!localStorage.getItem('token'))
const isScrolled = ref(false)
const currentSection = ref('hero')

const navItems = [
  { key: 'hero', label: '首页' },
  { key: 'features', label: '功能介绍' },
  { key: 'about', label: '关于我们' },
  { key: 'contact', label: '联系方式' }
]

const features = [
  {
    icon: markRaw(User),
    title: '客户管理',
    desc: '全面管理客户信息，支持客户分类、标签管理、批量操作，打造360度客户视图',
    tags: ['客户画像', '标签管理', '批量导入'],
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
  },
  {
    icon: markRaw(ChatLineSquare),
    title: '跟进记录',
    desc: '记录每一次客户沟通，支持多种跟进方式，确保服务连续性',
    tags: ['沟通记录', '跟进提醒', '任务管理'],
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
  },
  {
    icon: markRaw(TrendCharts),
    title: '数据统计',
    desc: '多维度数据分析，可视化图表展示，辅助决策制定',
    tags: ['销售报表', '趋势分析', '数据导出'],
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
  },
  {
    icon: markRaw(MagicStick),
    title: '权限控制',
    desc: '精细化权限管理，支持角色自定义，保障数据安全',
    tags: ['角色管理', '权限分配', '数据隔离'],
    gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
  }
]

const values = [
  { icon: markRaw(Trophy), text: '客户至上' },
  { icon: markRaw(Star), text: '专业服务' },
  { icon: markRaw(CircleCheck), text: '创新驱动' },
  { icon: markRaw(Timer), text: '安全可靠' }
]

const contactInfo = [
  { icon: markRaw(Phone), label: '服务热线', value: '400-888-8888', color: '#1e88e5' },
  { icon: markRaw(Message), label: '商务邮箱', value: 'business@zhike-crm.com', color: '#1565c0' },
  { icon: markRaw(Location), label: '公司地址', value: '北京市朝阳区科技园区A座', color: '#0d47a1' }
]

const contactForm = ref({
  name: '',
  email: '',
  phone: '',
  message: ''
})

const scrollToSection = (sectionId: string) => {
  currentSection.value = sectionId
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}

const goToDashboard = () => {
  router.push('/dashboard')
}

const handleLogout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userInfo')
  ElMessage.success('退出成功')
  window.location.href = '/'
}

const submitContact = () => {
  ElMessage.success('留言提交成功，我们会尽快与您联系！')
  contactForm.value = { name: '', email: '', phone: '', message: '' }
}

window.addEventListener('scroll', () => {
  isScrolled.value = window.scrollY > 50
  
  const sections = ['hero', 'features', 'about', 'contact']
  for (const section of sections) {
    const element = document.getElementById(section)
    if (element) {
      const rect = element.getBoundingClientRect()
      if (rect.top <= 100 && rect.bottom >= 100) {
        currentSection.value = section
        break
      }
    }
  }
})
</script>

<style scoped>
.out-home {
  min-height: 100vh;
  background: #f0f4f8;
}

.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  border-bottom: 1px solid transparent;
}

.header-scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 4px 30px rgba(0, 80, 200, 0.08);
  border-bottom: 1px solid rgba(30, 136, 229, 0.06);
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
}

.logo {
  font-size: 26px;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: -0.5px;
}

.logo:hover {
  transform: scale(1.03);
}

.nav-center {
  display: flex;
  gap: 4px;
}

.nav-item {
  font-size: 15px;
  padding: 10px 20px;
  border-radius: 24px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
}

.nav-right {
  display: flex;
  gap: 12px;
}

.nav-right .el-button {
  border-radius: 24px;
  font-weight: 500;
  padding: 10px 24px;
}

.nav-right .el-button--primary {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
}

.nav-right .el-button--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.45);
}

.nav-right .el-button:not(.el-button--primary) {
  background: rgba(37, 99, 235, 0.06);
  border: 1px solid rgba(37, 99, 235, 0.12);
  color: #1e40af;
}

.nav-right .el-button:not(.el-button--primary):hover {
  background: rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.25);
}

.section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 100px 40px;
}

.section-content {
  max-width: 1280px;
  width: 100%;
}

.section-header {
  text-align: center;
  margin-bottom: 64px;
}

.section-badge {
  margin-bottom: 16px;
}

.section-title {
  font-size: 42px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 16px;
  letter-spacing: -1px;
}

.section-desc {
  font-size: 18px;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.7;
}

.hero-section {
  background: linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%);
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  padding-top: 140px;
}

.hero-content {
  max-width: 1280px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 1;
  gap: 80px;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 80% 60% at 20% 20%, rgba(37, 99, 235, 0.06) 0%, transparent 50%),
    radial-gradient(ellipse 60% 50% at 80% 80%, rgba(30, 64, 175, 0.05) 0%, transparent 50%);
}

.hero-text {
  flex: 1.2;
  color: #1e293b;
}

.hero-badge {
  margin-bottom: 24px;
}

.hero-badge .el-badge__content {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
}

.hero-title {
  font-size: 72px;
  font-weight: 900;
  color: #0f172a;
  margin-bottom: 24px;
  letter-spacing: -2px;
  line-height: 1.1;
  animation: fadeInUp 0.8s ease;
}

.hero-subtitle {
  font-size: 22px;
  color: #475569;
  margin-bottom: 48px;
  line-height: 1.7;
  animation: fadeInUp 0.8s ease 0.2s backwards;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 64px;
  animation: fadeInUp 0.8s ease 0.4s backwards;
}

.hero-buttons .el-button {
  padding: 16px 40px;
  font-size: 16px;
  border-radius: 28px;
  font-weight: 600;
}

.hero-buttons .el-button--primary {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
}

.hero-buttons .el-button--primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);
}

.hero-buttons .el-button:not(.el-button--primary) {
  background: #fff;
  border: 2px solid #e2e8f0;
  color: #374151;
}

.hero-buttons .el-button:not(.el-button--primary):hover {
  border-color: #2563eb;
  color: #2563eb;
  background: rgba(37, 99, 235, 0.04);
}

.hero-stats {
  display: flex;
  align-items: center;
  gap: 48px;
  padding: 32px 40px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.06);
  animation: fadeInUp 0.8s ease 0.6s backwards;
}

.stat-item {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.stat-number {
  font-size: 42px;
  font-weight: 800;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}

.stat-label {
  font-size: 14px;
  color: #64748b;
  font-weight: 500;
  margin-top: 4px;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, transparent 0%, #e2e8f0 50%, transparent 100%);
}

.hero-visual {
  flex: 0.8;
  position: relative;
  height: 520px;
}

.floating-card {
  position: absolute;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(37, 99, 235, 0.08);
  border-radius: 20px;
  padding: 28px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  color: #1e40af;
  animation: float 6s ease-in-out infinite;
  box-shadow: 0 8px 32px rgba(37, 99, 235, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.floating-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 16px 48px rgba(37, 99, 235, 0.18);
}

.floating-card .el-icon {
  color: #2563eb;
}

.floating-card span {
  font-size: 22px;
  font-weight: 700;
  color: #1e293b;
}

.card-1 {
  top: 40px;
  right: 80px;
  animation-delay: 0s;
}

.card-2 {
  top: 210px;
  right: 0px;
  animation-delay: 2s;
}

.card-3 {
  top: 380px;
  right: 140px;
  animation-delay: 4s;
}

.features-section {
  background: #fff;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 28px;
}

.feature-card {
  background: #fff;
  padding: 36px;
  border-radius: 24px;
  border: 1px solid #e8eef5;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 48px rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.15);
}

.feature-icon {
  width: 72px;
  height: 72px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  margin-bottom: 24px;
}

.feature-title {
  font-size: 34px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 12px;
}

.feature-desc {
  font-size: 15px;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 20px;
}

.feature-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tags .el-tag {
  background: rgba(37, 99, 235, 0.08);
  color: #2563eb;
  border: none;
  font-weight: 500;
}

.about-section {
  background: linear-gradient(180deg, #f0f4f8 0%, #e8eef5 100%);
  color: #1e293b;
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 50% 40% at 90% 10%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse 40% 50% at 10% 90%, rgba(30, 64, 175, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-left {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.about-text-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.about-text {
  font-size: 17px;
  color: #475569;
  line-height: 1.9;
  letter-spacing: 0.3px;
}

.values-section {
  text-align: left;
}

.values-title {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 28px;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.value-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  padding: 28px 20px;
  background: #fff;
  border-radius: 18px;
  border: 1px solid #e8eef5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 40px rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.2);
}

.value-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.value-icon {
  color: #fff;
}

.value-text {
  font-size: 15px;
  font-weight: 600;
  color: #1e293b;
}

.about-right {
  display: flex;
  justify-content: center;
}

.about-image-wrapper {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(37, 99, 235, 0.15);
}

.about-image-wrapper img {
  width: 100%;
  height: 420px;
  object-fit: cover;
  display: block;
}

.image-decoration {
  position: absolute;
  bottom: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border-radius: 20px;
  opacity: 0.2;
  z-index: -1;
}

.contact-section {
  background: linear-gradient(180deg, #f8fafc 0%, #f0f4f8 100%);
  color: #1e293b;
  position: relative;
  overflow: hidden;
}

.contact-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 40% 50% at 10% 20%, rgba(37, 99, 235, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse 30% 40% at 90% 80%, rgba(30, 64, 175, 0.03) 0%, transparent 50%);
  pointer-events: none;
}

.contact-header {
  text-align: center;
  margin-bottom: 64px;
}

.contact-header .section-badge {
  margin-bottom: 20px;
}

.contact-header .section-badge .el-badge__content {
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 500;
}

.contact-header .section-title {
  color: #0f172a;
  font-size: 44px;
  font-weight: 800;
  letter-spacing: -1px;
  margin-bottom: 16px;
}

.contact-header .section-desc {
  color: #64748b;
  font-size: 18px;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.1fr;
  gap: 64px;
  align-items: start;
}

.contact-left {
  display: flex;
  flex-direction: column;
  gap: 36px;
}

.contact-intro h3 {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 16px;
}

.contact-intro p {
  font-size: 16px;
  color: #64748b;
  line-height: 1.8;
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 28px;
  background: #fff;
  border-radius: 20px;
  border: 1px solid #e8eef5;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: default;
}

.contact-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(37, 99, 235, 0.12);
  border-color: rgba(37, 99, 235, 0.2);
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-label {
  font-size: 13px;
  color: #94a3b8;
  font-weight: 500;
}

.card-value {
  font-size: 17px;
  font-weight: 600;
  color: #1e293b;
}

.contact-image {
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 24px 80px rgba(37, 99, 235, 0.18);
  height: 100%;
  min-height: 450px;
}

.contact-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, rgba(37, 99, 235, 0.2), transparent);
  pointer-events: none;
}

.contact-right {
  position: relative;
}

.form-card {
  background: #fff;
  border-radius: 28px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(37, 99, 235, 0.1);
  border: 1px solid #e8eef5;
}

.form-title {
  font-size: 26px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 8px;
}

.form-desc {
  font-size: 15px;
  color: #94a3b8;
  margin-bottom: 32px;
}

.contact-form .el-form-item {
  margin-bottom: 20px;
}

.contact-form .el-form-item__label {
  color: #475569;
  font-weight: 600;
  font-size: 14px;
  padding-bottom: 8px !important;
}

.contact-form .el-input,
.contact-form .el-textarea {
  background: #f8fafc;
  border: 2px solid #e8eef5;
  border-radius: 14px;
  transition: all 0.3s ease;
}

.contact-form .el-input:hover,
.contact-form .el-textarea:hover {
  border-color: #cbd5e1;
}

.contact-form .el-input:focus,
.contact-form .el-textarea:focus {
  border-color: #2563eb;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.contact-form .el-input__wrapper,
.contact-form .el-textarea__inner {
  border-radius: 14px;
  padding: 12px 16px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.submit-btn {
  width: 100%;
  height: 56px;
  border-radius: 16px;
  background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
  border: none;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  box-shadow: 0 8px 24px rgba(37, 99, 235, 0.4);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.submit-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(37, 99, 235, 0.5);
}

.submit-btn:active {
  transform: translateY(-1px);
}

.footer {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  color: #fff;
  padding: 80px 40px 40px;
}

.footer-content {
  max-width: 1280px;
  margin: 0 auto;
}

.footer-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 48px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.footer-brand {
  flex: 1;
}

.footer-logo {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.footer-desc {
  color: #94a3b8;
  font-size: 15px;
}

.footer-links {
  display: flex;
  gap: 80px;
}

.footer-link-group {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.footer-link-group h4 {
  color: #f1f5f9;
  font-weight: 600;
  font-size: 15px;
  margin-bottom: 4px;
}

.footer-link-group a {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 14px;
}

.footer-link-group a:hover {
  color: #60a5fa;
  padding-left: 6px;
}

.footer-bottom {
  text-align: center;
  color: #64748b;
  font-size: 14px;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-18px);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
}

@media (max-width: 1200px) {
  .hero-content {
    flex-direction: column;
    text-align: center;
    gap: 60px;
  }

  .hero-visual {
    display: none;
  }

  .hero-title {
    font-size: 56px;
  }

  .hero-stats {
    justify-content: center;
    flex-wrap: wrap;
    gap: 32px;
  }

  .about-grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .about-left {
    order: 2;
    text-align: center;
  }

  .about-right {
    order: 1;
  }

  .values-section {
    text-align: center;
  }

  .about-image-wrapper img {
    height: 320px;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  .contact-container {
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .footer-top {
    flex-direction: column;
    gap: 40px;
  }

  .footer-links {
    flex-wrap: wrap;
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .header-content {
    padding: 12px 20px;
  }

  .nav-center {
    display: none;
  }

  .hero-section {
    padding: 120px 20px 80px;
    min-height: auto;
  }

  .hero-title {
    font-size: 40px;
    letter-spacing: -1px;
  }

  .hero-subtitle {
    font-size: 17px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .hero-stats {
    padding: 24px 28px;
    gap: 24px;
  }

  .hero-stats .stat-number {
    font-size: 32px;
  }

  .section {
    padding: 80px 20px;
  }

  .section-title {
    font-size: 32px;
    letter-spacing: -0.5px;
  }

  .section-desc {
    font-size: 16px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .feature-card {
    padding: 28px;
  }

  .about-text {
    font-size: 15px;
  }

  .about-image-wrapper img {
    height: 240px;
  }

  .values-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .value-card {
    padding: 24px 16px;
  }

  .value-icon-wrapper {
    width: 52px;
    height: 52px;
  }

  .value-icon {
    font-size: 26px;
  }

  .value-text {
    font-size: 14px;
  }

  .contact-header .section-title {
    font-size: 28px;
  }

  .contact-intro h3 {
    font-size: 22px;
  }

  .contact-intro p {
    font-size: 15px;
  }

  .contact-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .contact-image {
    border-radius: 16px;
    min-height: 250px;
  }
}
</style>
