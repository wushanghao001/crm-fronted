<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="p-6">
      <div class="mb-6">
        <div class="flex items-center gap-3 mb-4">
          <button @click="goBack" class="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <svg class="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">客户跟进</h1>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div class="lg:col-span-2">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="p-6 border-b border-gray-200 dark:border-gray-700">
                <div v-if="!dataReady" class="animate-pulse">
                  <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
                  <div class="flex gap-4">
                    <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                    <div class="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                </div>
                <div v-else class="flex items-center justify-between">
                  <div>
                    <h2 class="text-xl font-semibold text-gray-800 dark:text-white">{{ customerInfo.name }}</h2>
                    <div class="flex items-center gap-4 mt-2">
                      <span :class="getLevelClass(customerInfo.customerLevel)" class="px-2 py-1 rounded text-xs">
                        {{ customerInfo.customerLevel || 'C' }}级客户
                      </span>
                      <span :class="getStatusClass(customerInfo.status)" class="px-2 py-1 rounded text-xs">
                        {{ getStatusText(customerInfo.status) }}
                      </span>
                      <span class="text-sm text-gray-500 dark:text-gray-400">行业: {{ customerInfo.industry || '-' }}</span>
                    </div>
                  </div>
                  <button
                    @click="openQuickFollowModal"
                    class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    快速跟进
                  </button>
                </div>
              </div>

              <div class="p-6">
                <div v-if="!dataReady" class="animate-pulse">
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div v-for="i in 8" :key="i">
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                      <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">联系电话</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ customerInfo.phone || '-' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">邮箱</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ customerInfo.email || '-' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">客户负责人</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ customerInfo.contactName || '-' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">最近跟进</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ customerInfo.lastFollowTime || '-' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">累计跟进次数</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ customerInfo.followCount || 0 }} 次</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">当前商机阶段</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ getFollowResultText(customerInfo.currentStage) || '-' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">客户规模</p>
                    <p class="mt-1 text-gray-800 dark:text-white">{{ customerInfo.scale || '-' }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-500 dark:text-gray-400">累计成交金额</p>
                    <p class="mt-1 text-gray-800 dark:text-white">¥{{ formatAmount(customerInfo.totalPaidAmount) }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">跟进记录</h3>
                <button
                  @click="openFollowModal"
                  class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  新增跟进
                </button>
              </div>

              <div class="p-4">
                <div class="flex flex-wrap gap-4 mb-4">
                  <input
                    v-model="searchKeyword"
                    type="text"
                    placeholder="搜索跟进内容..."
                    class="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                    @keyup.enter="loadFollowList"
                  />
                  <select
                    v-model="filterFollowType"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="">全部方式</option>
                    <option value="phone">电话</option>
                    <option value="wechat">微信</option>
                    <option value="email">邮件</option>
                    <option value="meeting">面谈</option>
                    <option value="sms">短信</option>
                    <option value="video">视频会议</option>
                    <option value="other">其他</option>
                  </select>
                  <select
                    v-model="filterFollowResult"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="">全部结果</option>
                    <option value="initial_contact">初步沟通</option>
                    <option value="requirement">需求确认</option>
                    <option value="quotation">方案报价</option>
                    <option value="negotiation">商务谈判</option>
                    <option value="pending_deal">待成交</option>
                    <option value="closed">已成交</option>
                    <option value="lost">无意向</option>
                    <option value="contact_lost">客户失联</option>
                  </select>
                  <select
                    v-model="filterIntentLevel"
                    class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
                  >
                    <option value="">全部意向度</option>
                    <option value="high">高意向</option>
                    <option value="medium">中意向</option>
                    <option value="low">低意向</option>
                  </select>
                  <button
                    @click="loadFollowList"
                    class="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                  >
                    搜索
                  </button>
                </div>

                <div v-if="loading" class="flex items-center justify-center py-12">
                  <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>

                <div v-else-if="followList.length === 0" class="text-center py-12 text-gray-500 dark:text-gray-400">
                  暂无跟进记录
                </div>

                <div v-else class="overflow-x-auto">
                  <NDataTable
                    :columns="columns"
                    :data="followList"
                    :loading="loading"
                    :pagination="false"
                    :scroll-x="1200"
                    :scroll-y="400"
                    :row-key="(row) => row.id"
                  />
                </div>

                <div class="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
                  <span class="text-sm text-gray-500">共 {{ total }} 条</span>
                  <NPagination
                    v-model:page="page"
                    v-model:page-size="pageSize"
                    :page-count="Math.ceil(total / pageSize) || 1"
                    :page-sizes="[10, 20, 50, 100]"
                    :show-size-picker="true"
                    :total="total"
                    @update:page="handlePageChange"
                    @update:page-size="handlePageSizeChange"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="lg:col-span-1">
            <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 sticky top-6">
              <div class="p-4 border-b border-gray-200 dark:border-gray-700">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-white">跟进时间轴</h3>
              </div>
              <div class="p-4 max-h-[600px] overflow-y-auto">
                <div v-if="timelineList.length === 0" class="text-center py-8 text-gray-500 dark:text-gray-400">
                  暂无跟进记录
                </div>
                <div v-else class="space-y-4">
                  <div v-for="(item, index) in timelineList" :key="item.id" class="relative">
                    <div v-if="index !== 0" class="absolute left-4 top-[-16px] w-0.5 h-4 bg-gray-200 dark:bg-gray-600"></div>
                    <div class="flex gap-3">
                      <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center gap-2">
                          <span class="text-sm font-medium text-gray-800 dark:text-white">{{ item.createdAt }}</span>
                          <span class="px-2 py-0.5 rounded text-xs" :class="getIntentLevelClass(item.intentLevel)">
                            {{ getIntentLevelText(item.intentLevel) }}
                          </span>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {{ getFollowTypeText(item.followType) }} · {{ getFollowResultText(item.followResult) }}
                        </p>
                        <p class="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{{ item.content }}</p>
                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">跟进人: {{ item.followUserName }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="dataReady && nextFollowTask.length > 0 && customerInfo.status !== 'churned'" class="p-4 border-t border-gray-200 dark:border-gray-700">
                <h4 class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">下次跟进提醒</h4>
                <div class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                  <p class="text-sm text-gray-800 dark:text-gray-200">{{ nextFollowTask[0].title }} - {{ nextFollowTask[0].customerName || '未知客户' }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">提醒时间: {{ nextFollowTask[0].dueDate }}</p>
                  <p v-if="nextFollowTask[0].remark" class="text-xs text-gray-500 dark:text-gray-400 mt-1">备注: {{ nextFollowTask[0].remark }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showFollowModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeFollowModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ isEditMode ? '编辑跟进' : '新增跟进' }}</h3>
          <button @click="closeFollowModal" class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进方式 <span class="text-red-500">*</span></label>
              <select
                v-model="formData.followType"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">请选择</option>
                <option value="phone">电话</option>
                <option value="wechat">微信</option>
                <option value="email">邮件</option>
                <option value="meeting">面谈</option>
                <option value="sms">短信</option>
                <option value="video">视频会议</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进结果 <span class="text-red-500">*</span></label>
              <select
                v-model="formData.followResult"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">请选择</option>
                <option value="initial_contact">初步沟通</option>
                <option value="requirement">需求确认</option>
                <option value="quotation">方案报价</option>
                <option value="negotiation">商务谈判</option>
                <option value="pending_deal">待成交</option>
                <option value="closed">已成交</option>
                <option value="lost">无意向</option>
                <option value="contact_lost">客户失联</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">客户意向度</label>
              <select
                v-model="formData.intentLevel"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="high">高意向</option>
                <option value="medium">中意向</option>
                <option value="low">低意向</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进内容 <span class="text-red-500">*</span></label>
              <textarea
                v-model="formData.content"
                rows="4"
                placeholder="请输入本次跟进的具体内容..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">下次跟进时间</label>
              <NDatePicker
                v-model:value="formData.nextFollowTime"
                type="datetime"
                placeholder="请选择日期和时间"
                style="width: 100%;"
                clearable
              />
            </div>

            <div class="flex items-center gap-2">
              <input
                v-model="formData.remindFlag"
                type="checkbox"
                id="remindFlag"
                class="w-4 h-4 text-blue-500 border-gray-300 rounded"
              />
              <label for="remindFlag" class="text-sm text-gray-700 dark:text-gray-300">创建待办提醒</label>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">附件上传</label>
              <div
                class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer"
                @click="triggerFileUpload"
              >
                <svg class="w-8 h-8 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">点击或拖拽上传文件</p>
                <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">支持图片、PDF、DOC、DOCX、XLSX (最大10MB)</p>
                <input ref="fileInput" type="file" class="hidden" multiple accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xlsx" @change="handleFileUpload" />
              </div>
              <div v-if="uploadedFiles.length > 0" class="mt-2 space-y-2">
                <div v-for="(file, index) in uploadedFiles" :key="index" class="flex items-center justify-between bg-gray-50 dark:bg-gray-700 rounded px-3 py-2">
                  <span class="text-sm text-gray-700 dark:text-gray-300 truncate">{{ file.name }}</span>
                  <button @click="removeFile(index)" class="text-red-500 hover:text-red-700">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进备注</label>
              <textarea
                v-model="formData.remark"
                rows="3"
                placeholder="请输入备注信息..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              ></textarea>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="closeFollowModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              取消
            </button>
            <button
              @click="submitFollow"
              :disabled="submitLoading"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {{ submitLoading ? '提交中...' : '提交' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showQuickFollowModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeQuickFollowModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-md m-4">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">快速跟进</h3>
          <button @click="closeQuickFollowModal" class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进方式 <span class="text-red-500">*</span></label>
              <select
                v-model="quickFormData.followType"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">请选择</option>
                <option value="phone">电话</option>
                <option value="wechat">微信</option>
                <option value="email">邮件</option>
                <option value="meeting">面谈</option>
                <option value="sms">短信</option>
                <option value="video">视频会议</option>
                <option value="other">其他</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进结果 <span class="text-red-500">*</span></label>
              <select
                v-model="quickFormData.followResult"
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <option value="">请选择</option>
                <option value="initial_contact">初步沟通</option>
                <option value="requirement">需求确认</option>
                <option value="quotation">方案报价</option>
                <option value="negotiation">商务谈判</option>
                <option value="pending_deal">待成交</option>
                <option value="closed">已成交</option>
                <option value="lost">无意向</option>
                <option value="contact_lost">客户失联</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">跟进内容 <span class="text-red-500">*</span></label>
              <textarea
                v-model="quickFormData.content"
                rows="4"
                placeholder="请输入本次跟进的具体内容..."
                class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white"
              ></textarea>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button
              @click="closeQuickFollowModal"
              class="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              取消
            </button>
            <button
              @click="submitQuickFollow"
              :disabled="submitLoading"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50"
            >
              {{ submitLoading ? '提交中...' : '提交' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showDetailModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" @click.self="closeDetailModal">
      <div class="bg-white dark:bg-gray-800 rounded-xl w-full max-w-2xl m-4">
        <div class="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-800 dark:text-white">跟进详情</h3>
          <button @click="closeDetailModal" class="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">跟进时间</p>
              <p class="mt-1 text-gray-800 dark:text-white">{{ currentFollow?.createdAt || '-' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">跟进方式</p>
              <p class="mt-1 text-gray-800 dark:text-white">{{ getFollowTypeText(currentFollow?.followType) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">跟进结果</p>
              <p class="mt-1 text-gray-800 dark:text-white">{{ getFollowResultText(currentFollow?.followResult) }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">客户意向度</p>
              <p class="mt-1">
                <span :class="getIntentLevelClass(currentFollow?.intentLevel)" class="px-2 py-1 rounded text-xs">
                  {{ getIntentLevelText(currentFollow?.intentLevel) }}
                </span>
              </p>
            </div>
            <div class="col-span-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">跟进内容</p>
              <p class="mt-1 text-gray-800 dark:text-white whitespace-pre-wrap">{{ currentFollow?.content || '-' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">下次跟进时间</p>
              <p class="mt-1 text-gray-800 dark:text-white">{{ currentFollow?.nextFollowTime || '-' }}</p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">跟进人</p>
              <p class="mt-1 text-gray-800 dark:text-white">{{ currentFollow?.followUserName || '-' }}</p>
            </div>
            <div v-if="currentFollow?.remark" class="col-span-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">备注</p>
              <p class="mt-1 text-gray-800 dark:text-white whitespace-pre-wrap">{{ currentFollow.remark }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NDatePicker, NButton, NDataTable, NPagination, NSpace, NDropdown } from 'naive-ui'
import { getFollowList, getFollowDetail, createFollow, updateFollow, deleteFollow, getPendingFollowTasks, type CustomerFollow } from '@/api/customerFollow'
import { getCustomerById } from '@/api/customer'

const route = useRoute()
const router = useRouter()

const customerId = ref(Number(route.params.customerId))

const customerInfo = reactive<any>({
  name: '',
  phone: '',
  email: '',
  industry: '',
  scale: '',
  status: '',
  customerLevel: 'C',
  contactName: '',
  lastFollowTime: '',
  followCount: 0,
  currentStage: '',
  totalPaidAmount: 0
})

const followList = ref<CustomerFollow[]>([])
const timelineList = ref<CustomerFollow[]>([])
const loading = ref(false)
const submitLoading = ref(false)
const dataReady = ref(false)

const showFollowModal = ref(false)
const showQuickFollowModal = ref(false)
const showDetailModal = ref(false)
const isEditMode = ref(false)
const currentFollowId = ref<number | null>(null)
const currentFollow = ref<CustomerFollow | null>(null)
const nextFollowTask = ref<any[]>([])

const uploadedFiles = ref<{ name: string; url: string }[]>([])
const fileInput = ref<HTMLInputElement | null>(null)

const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

const renderActions = (row: any) => {
  const options = [
    { label: '查看', key: 'view' },
    { label: '编辑', key: 'edit' },
    { label: '删除', key: 'delete' }
  ]
  const handleSelect = (key: string) => {
    if (key === 'view') viewFollowDetail(row)
    else if (key === 'edit') editFollow(row)
    else if (key === 'delete') deleteFollowConfirm(row.id)
  }
  return h(NDropdown, {
    trigger: 'click',
    options,
    onSelect: handleSelect
  }, {
    default: () => h('a', { class: 'text-blue-500 hover:text-blue-700 cursor-pointer flex items-center justify-center', style: 'font-size: 18px; width: 100%; height: 100%;' }, '...')
  })
}

const columns = [
  { title: '跟进时间', key: 'createdAt', width: 150 },
  { title: '跟进方式', key: 'followType', width: 100,
    render: (row: any) => getFollowTypeText(row.followType) },
  { title: '跟进结果', key: 'followResult', width: 120,
    render: (row: any) => getFollowResultText(row.followResult) },
  { title: '跟进内容', key: 'content', width: 250, ellipsis: { tooltip: true } },
  { title: '意向度', key: 'intentLevel', width: 100,
    render: (row: any) => h('span', { class: getIntentLevelClass(row.intentLevel) }, getIntentLevelText(row.intentLevel)) },
  { title: '下次跟进', key: 'nextFollowTime', width: 150 },
  { title: '跟进人', key: 'followUserName', width: 100 },
  { title: '操作', key: 'actions', width: 60, fixed: 'right', render: renderActions }
]

const searchKeyword = ref('')
const filterFollowType = ref('')
const filterFollowResult = ref('')
const filterIntentLevel = ref('')

const formData = reactive({
  followType: '',
  followResult: '',
  intentLevel: 'medium',
  content: '',
  remark: '',
  nextFollowTime: null as number | null,
  remindFlag: false
})

const quickFormData = reactive({
  followType: '',
  followResult: '',
  content: ''
})

const statusMap: Record<string, { text: string; class: string }> = {
  active: { text: '活跃', class: 'bg-green-100 text-green-700' },
  potential: { text: '潜在', class: 'bg-blue-100 text-blue-700' },
  warning: { text: '流失预警', class: 'bg-orange-100 text-orange-700' },
  churned: { text: '已流失', class: 'bg-red-100 text-red-700' }
}

const followTypeMap: Record<string, string> = {
  phone: '电话',
  wechat: '微信',
  email: '邮件',
  meeting: '面谈',
  sms: '短信',
  video: '视频会议',
  other: '其他'
}

const followResultMap: Record<string, string> = {
  initial_contact: '初步沟通',
  requirement: '需求确认',
  quotation: '方案报价',
  negotiation: '商务谈判',
  pending_deal: '待成交',
  closed: '已成交',
  lost: '无意向',
  contact_lost: '客户失联'
}

const intentLevelMap: Record<string, string> = {
  high: '高意向',
  medium: '中意向',
  low: '低意向'
}

const getStatusText = (status: string) => statusMap[status]?.text || status || '新客户'
const getStatusClass = (status: string) => statusMap[status]?.class || 'bg-gray-100 text-gray-700'
const getLevelClass = (level: string) => {
  const map: Record<string, string> = {
    A: 'bg-red-100 text-red-700',
    B: 'bg-orange-100 text-orange-700',
    C: 'bg-yellow-100 text-yellow-700',
    D: 'bg-gray-100 text-gray-700'
  }
  return map[level] || 'bg-gray-100 text-gray-700'
}
const getFollowTypeText = (type: string) => followTypeMap[type] || type || '-'
const getFollowResultText = (result: string) => followResultMap[result] || result || '-'
const getIntentLevelText = (level: string) => intentLevelMap[level] || level || '-'
const getIntentLevelClass = (level: string) => {
  const map: Record<string, string> = {
    high: 'bg-green-100 text-green-700',
    medium: 'bg-orange-100 text-orange-700',
    low: 'bg-gray-100 text-gray-700'
  }
  return map[level] || 'bg-gray-100 text-gray-700'
}

const formatAmount = (amount: number) => {
  if (!amount) return '0.00'
  return new Intl.NumberFormat('zh-CN', { minimumFractionDigits: 2 }).format(amount)
}

const goBack = () => {
  router.back()
}

const handlePageChange = (newPage: number) => {
  page.value = newPage
  loadFollowList()
}

const handlePageSizeChange = (newPageSize: number) => {
  pageSize.value = newPageSize
  page.value = 1
  loadFollowList()
}

const loadCustomerInfo = async () => {
  try {
    const res = await getCustomerById(customerId.value)
    Object.assign(customerInfo, res)
    dataReady.value = true
  } catch (error) {
    console.error('加载客户信息失败:', error)
  }
}

const loadFollowList = async () => {
  loading.value = true
  try {
    const res = await getFollowList({
      customerId: customerId.value,
      pageNum: page.value,
      pageSize: pageSize.value,
      keyword: searchKeyword.value || undefined,
      followType: filterFollowType.value || undefined,
      followResult: filterFollowResult.value || undefined,
      intentLevel: filterIntentLevel.value || undefined
    })
    followList.value = res.list || []
    total.value = res.total || 0
    timelineList.value = res.list || []
  } catch (error) {
    console.error('加载跟进列表失败:', error)
  } finally {
    loading.value = false
  }
}

const loadNextFollowTask = async (customerId: number) => {
  try {
    const tasks = await getPendingFollowTasks(customerId)
    nextFollowTask.value = tasks || []
  } catch (error) {
    console.error('获取待办提醒失败:', error)
    nextFollowTask.value = []
  }
}

const openFollowModal = () => {
  isEditMode.value = false
  currentFollowId.value = null
  resetFormData()
  showFollowModal.value = true
}

const openQuickFollowModal = () => {
  resetQuickFormData()
  showQuickFollowModal.value = true
}

const closeFollowModal = () => {
  showFollowModal.value = false
  resetFormData()
}

const closeQuickFollowModal = () => {
  showQuickFollowModal.value = false
  resetQuickFormData()
}

const resetFormData = () => {
  formData.followType = ''
  formData.followResult = ''
  formData.intentLevel = 'medium'
  formData.content = ''
  formData.remark = ''
  formData.nextFollowTime = null
  formData.remindFlag = false
  uploadedFiles.value = []
}

const resetQuickFormData = () => {
  quickFormData.followType = ''
  quickFormData.followResult = ''
  quickFormData.content = ''
}

const submitFollow = async () => {
  if (!formData.followType || !formData.followResult || !formData.content) {
    alert('请填写必填项')
    return
  }

  submitLoading.value = true
  try {
    const data: any = {
      customerId: customerId.value,
      followType: formData.followType,
      followResult: formData.followResult,
      intentLevel: formData.intentLevel,
      content: formData.content,
      remark: formData.remark,
      remindFlag: formData.remindFlag
    }

    if (formData.nextFollowTime) {
      const date = new Date(formData.nextFollowTime)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      data.nextFollowTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    if (uploadedFiles.value.length > 0) {
      data.attachment = uploadedFiles.value.map(f => f.url).join(',')
    }

    if (isEditMode.value && currentFollowId.value) {
      await updateFollow(currentFollowId.value, data)
    } else {
      await createFollow(data)
    }

    closeFollowModal()
    loadFollowList()
    loadCustomerInfo()
    loadNextFollowTask(customerId.value)
  } catch (error) {
    console.error('提交跟进失败:', error)
    alert('提交失败，请重试')
  } finally {
    submitLoading.value = false
  }
}

const submitQuickFollow = async () => {
  if (!quickFormData.followType || !quickFormData.followResult || !quickFormData.content) {
    alert('请填写必填项')
    return
  }

  submitLoading.value = true
  try {
    await createFollow({
      customerId: customerId.value,
      followType: quickFormData.followType,
      followResult: quickFormData.followResult,
      intentLevel: 'medium',
      content: quickFormData.content
    })

    closeQuickFollowModal()
    loadFollowList()
    loadCustomerInfo()
    loadNextFollowTask(customerId.value)
  } catch (error) {
    console.error('提交跟进失败:', error)
    alert('提交失败，请重试')
  } finally {
    submitLoading.value = false
  }
}

const viewFollowDetail = async (follow: CustomerFollow) => {
  try {
    const res = await getFollowDetail(follow.id!)
    currentFollow.value = res
    showDetailModal.value = true
  } catch (error) {
    console.error('加载跟进详情失败:', error)
  }
}

const editFollow = (follow: CustomerFollow) => {
  isEditMode.value = true
  currentFollowId.value = follow.id!
  formData.followType = follow.followType || ''
  formData.followResult = follow.followResult || ''
  formData.intentLevel = follow.intentLevel || 'medium'
  formData.content = follow.content || ''
  formData.remark = follow.remark || ''
  formData.nextFollowTime = follow.nextFollowTime ? new Date(follow.nextFollowTime).getTime() : null
  formData.remindFlag = follow.remindFlag || false
  showFollowModal.value = true
}

const deleteFollowConfirm = async (id: number) => {
  if (!confirm('确定要删除该跟进记录吗？')) return
  try {
    await deleteFollow(id)
    loadFollowList()
    loadCustomerInfo()
    loadNextFollowTask(customerId.value)
  } catch (error) {
    console.error('删除跟进失败:', error)
    alert('删除失败，请重试')
  }
}

const closeDetailModal = () => {
  showDetailModal.value = false
  currentFollow.value = null
}

const triggerFileUpload = () => {
  fileInput.value?.click()
}

const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    if (file.size > 10 * 1024 * 1024) {
      alert(`文件 ${file.name} 超过10MB限制`)
      continue
    }
    // Mock upload - in real app would upload to server
    uploadedFiles.value.push({
      name: file.name,
      url: '/uploads/' + file.name
    })
  }
}

const removeFile = (index: number) => {
  uploadedFiles.value.splice(index, 1)
}

onMounted(() => {
  loadCustomerInfo()
  loadFollowList()
  loadNextFollowTask(customerId.value)
})
</script>