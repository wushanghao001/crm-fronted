<template>
  <NModal v-model:show="showModal" preset="card" title="CRM客户管理系统帮助手册" style="width: 800px; max-width: 90vw;" :mask-closable="false">
    <div class="help-manual">
      <div class="help-title">CRM客户管理系统帮助手册</div>

      <div class="help-section">
        <div class="help-note">
          <strong>说明：</strong>本手册专为新手小白设计，所有操作均为一步一步指引，跟着点击即可，无需专业知识，可直接复制使用。
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">一、系统登录与首页操作</div>

        <div class="help-section">
          <div class="section-title">1. 系统登录步骤</div>
          <ol class="help-list">
            <li>打开任意浏览器，输入系统访问地址（由管理员提供）；</li>
            <li>进入登录页面后，输入管理员分配的账号和初始密码；</li>
            <li>点击【登录】按钮，即可进入系统首页；</li>
            <li><strong>注意：</strong>首次登录请及时修改初始密码，避免账号泄露；若提示"账号或密码错误"，检查大小写、空格，无误后仍无法登录，联系管理员重置密码。</li>
          </ol>
        </div>

        <div class="help-section">
          <div class="section-title">2. 首页功能说明</div>
          <p>登录后默认进入【管理首页】，页面将展示核心数据看板，包括：客户总数、本月新增客户数、待跟进客户数，可快速了解自身工作进度，无需额外操作。</p>
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">二、客户管理（核心功能，必看）</div>

        <div class="help-section">
          <div class="section-title">1. 进入客户列表</div>
          <p>点击左侧菜单栏【客户管理】→【客户列表】，即可查看所有客户信息，页面分为两个标签：</p>
          <ul class="help-list">
            <li><strong>我的客户：</strong>分配给你负责的客户，仅你可操作（编辑、跟进）；</li>
            <li><strong>公海客户：</strong>未分配的公共客户，所有用户可申请跟进、领取。</li>
          </ul>
        </div>

        <div class="help-section">
          <div class="section-title">2. 添加新客户</div>
          <ol class="help-list">
            <li>进入【客户列表】页面，点击右上角蓝色【+ 添加客户】按钮；</li>
            <li>在弹出的表单中，填写客户信息（标"*"的为必填项，如客户名称、联系电话、客户等级）；</li>
            <li>填写完成后，点击【提交】按钮，新客户将自动显示在你的客户列表中。</li>
          </ol>
        </div>

        <div class="help-section">
          <div class="section-title">3. 搜索/筛选客户</div>
          <p>当客户数量较多时，可通过以下方式快速定位：</p>
          <ol class="help-list">
            <li><strong>搜索框：</strong>输入客户名称或联系电话，点击【搜索】按钮，即可快速找到目标客户；</li>
            <li><strong>下拉筛选：</strong>通过页面上方的下拉框，按客户等级、行业、地区筛选客户；</li>
            <li><strong>重置：</strong>点击【重置】按钮，可清空所有筛选条件，恢复显示全部客户。</li>
          </ol>
        </div>

        <div class="help-section">
          <div class="section-title">4. 客户列表操作按钮使用说明</div>
          <p>每个客户右侧均有操作按钮，功能及使用场景如下，按需求点击即可：</p>
          <ul class="help-list">
            <li><strong>编辑：</strong>客户信息有变更（如换电话、改地址）时点击，修改后保存即可；</li>
            <li><strong>跟进：</strong>与客户沟通后点击，记录跟进情况（沟通时间、方式、内容、下次计划）；</li>
            <li><strong>删除：</strong>仅管理员有权限，普通用户无此按钮，无需担心误删。</li>
          </ul>
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">三、客户跟进管理</div>

        <div class="help-section">
          <div class="section-title">1. 记录客户跟进</div>
          <ol class="help-list">
            <li>在【客户列表】中，找到需要跟进的客户，点击右侧【跟进】按钮；</li>
            <li>在弹出的表单中，填写以下信息：跟进时间、跟进方式（电话/微信/面谈）、跟进内容、下次跟进时间；</li>
            <li>填写完成后点击【提交】，跟进记录将自动保存，后续可随时查看。</li>
          </ol>
        </div>

        <div class="help-section">
          <div class="section-title">2. 查看跟进记录</div>
          <p>点击左侧菜单栏【客户管理】→【交互记录】，即可查看你所有客户的跟进记录，支持按客户名称、跟进时间筛选，方便复盘沟通情况。</p>
        </div>

        <div class="help-section">
          <div class="section-title">3. 跟进记录查询</div>
          <p>点击左侧菜单栏【客户管理】→【客户跟进查询】，可按客户、跟进时间、跟进人筛选记录，适合做周报、月报时快速汇总数据。</p>
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">四、个人业绩与销售机会</div>

        <div class="help-section">
          <div class="section-title">1. 查看个人业绩</div>
          <p>点击左侧菜单栏【个人业绩】，即可查看自身核心工作数据，包括：客户总数、跟进次数、成交客户数，直观了解工作成果。</p>
        </div>

        <div class="help-section">
          <div class="section-title">2. 销售机会管理</div>
          <p>若系统开通此功能，点击左侧【销售机会】：</p>
          <ol class="help-list">
            <li>点击【添加】按钮，可记录客户潜在销售机会（填写机会阶段、预计成交金额、负责人等）；</li>
            <li>当机会推进时，及时点击【编辑】，更新阶段状态，方便后续跟进。</li>
          </ol>
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">五、其他常用功能</div>

        <div class="help-section">
          <div class="section-title">1. 服务管理</div>
          <p>点击左侧【服务管理】，可记录客户售后需求、问题反馈（如产品咨询、投诉建议），跟进处理进度，提升客户满意度。</p>
        </div>

        <div class="help-section">
          <div class="section-title">2. 历史订单</div>
          <p>点击左侧【客户管理】→【历史订单】，可查看所有客户的订单记录，了解客户购买情况，辅助后续跟进和销售决策。</p>
        </div>

        <div class="help-section">
          <div class="section-title">3. 产品维护</div>
          <p>点击左侧【产品维护】，可查看系统内所有产品信息，与客户沟通时可快速查阅，无需翻阅外部资料。</p>
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">六、系统管理（仅管理员使用，普通用户可忽略）</div>
        <p>管理员可通过左侧【系统管理】菜单，进行以下操作：</p>
        <ul class="help-list">
          <li><strong>用户管理：</strong>添加、删除系统用户，分配账号和初始密码；</li>
          <li><strong>权限管理：</strong>设置不同角色的功能权限（如限制普通用户删除客户）；</li>
          <li><strong>日志管理：</strong>查看系统所有操作日志，排查异常问题。</li>
        </ul>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">七、常见问题与避坑指南（小白必看）</div>

        <div class="help-section">
          <div class="section-title question">1. 登录后看不到客户列表？</div>
          <p><strong>答：</strong>可能是账号无相关权限，联系管理员分配客户；或检查网络，刷新页面重试。</p>
        </div>

        <div class="help-section">
          <div class="section-title question">2. 提交客户/跟进信息无反应？</div>
          <p><strong>答：</strong>检查标"*"的必填项是否漏填；不要重复点击提交，等待页面加载完成；仍无效，退出系统重新登录再操作。</p>
        </div>

        <div class="help-section">
          <div class="section-title question">3. 客户列表分页异常，找不到后续客户？</div>
          <p><strong>答：</strong>查看页面下方分页设置（如"10条/页"），可修改为20条/50条/页；点击分页"下一页"按钮，即可切换页面。</p>
        </div>

        <div class="help-section">
          <div class="section-title question">4. 提交的数据不见了？</div>
          <p><strong>答：</strong>先检查是否切错标签（如误点"公海客户"）；普通用户无删除权限，无需担心误删；仍找不到，联系管理员恢复数据。</p>
        </div>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">八、安全与使用建议</div>
        <ul class="help-list">
          <li>请勿将个人账号密码告知他人，离开电脑时务必退出系统；</li>
          <li>客户信息为敏感数据，禁止截图、转发给系统外人员；</li>
          <li>跟进记录请及时填写，避免遗漏重要沟通信息，方便后续复盘；</li>
          <li>遇到系统报错，先截图保存报错页面，再联系管理员，便于快速定位问题。</li>
        </ul>
      </div>

      <div class="help-chapter">
        <div class="chapter-title">九、帮助与反馈</div>
        <p>若遇到手册中未提及的问题，或操作困难，可通过以下方式解决：</p>
        <ol class="help-list">
          <li>直接咨询系统管理员；</li>
          <li>反馈问题时，请说明：当前所在页面、操作步骤、出现的提示（附截图更佳），方便管理员快速解决。</li>
        </ol>
      </div>
    </div>
  </NModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NModal } from 'naive-ui'

const showModal = ref(false)

const open = () => {
  showModal.value = true
}

defineExpose({ open })
</script>

<style scoped>
.help-manual {
  font-size: 14px;
  line-height: 1.8;
  color: #333;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 10px;
}

.help-manual::-webkit-scrollbar {
  width: 6px;
}

.help-manual::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.help-title {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  color: #2c5aa0;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #2c5aa0;
}

.help-chapter {
  margin-bottom: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #2c5aa0;
}

.chapter-title {
  font-size: 18px;
  font-weight: bold;
  color: #2c5aa0;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #ddd;
}

.help-section {
  margin-bottom: 15px;
}

.section-title {
  font-size: 15px;
  font-weight: bold;
  color: #444;
  margin-bottom: 8px;
}

.section-title.question {
  color: #e67e22;
}

.help-note {
  background: #fff3cd;
  padding: 12px 15px;
  border-radius: 6px;
  border: 1px solid #ffc107;
  color: #856404;
}

.help-list {
  margin: 0;
  padding-left: 25px;
}

.help-list li {
  margin-bottom: 6px;
  list-style-type: decimal;
}

.help-list li strong {
  color: #2c5aa0;
}

p {
  margin: 8px 0;
  text-indent: 2em;
}

strong {
  color: #2c5aa0;
}
</style>
