<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800 dark:text-white">历史订单</h2>
        <p class="text-gray-500 dark:text-gray-400 mt-1">查看和管理客户订单</p>
      </div>
      <div class="flex gap-3">
        <NButton v-if="selectedIds.length > 0" type="error" @click="handleBatchDelete">
          <Trash class="w-4 h-4 mr-1" />
          批量删除 ({{ selectedIds.length }})
        </NButton>
        <NButton type="primary" @click="handleCreate" class="bg-blue-500 hover:bg-blue-600">
          <Add class="w-4 h-4 mr-1" />
          新建订单
        </NButton>
        <NButton type="primary" @click="handleExport">
          <Download class="w-4 h-4 mr-1" />
          导出订单
        </NButton>
      </div>
    </div>
    
    <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <NInput
              v-model:value="searchKeyword"
              placeholder="搜索订单编号或客户名称"
              class="w-full"
              @keyup.enter="handleSearch"
            />
          </div>
          <NSelect
            v-model:value="statusFilter"
            placeholder="订单状态"
            class="w-40"
            :options="statusOptions"
          />
          <NSelect
            v-model:value="payStatusFilter"
            placeholder="支付状态"
            class="w-40"
            :options="payStatusOptions"
          />
          <NButton type="primary" @click="handleSearch">搜索</NButton>
          <NButton @click="handleReset">重置</NButton>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 dark:bg-gray-700">
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-12">
                <NCheckbox 
                  :checked="selectedIds.length === orderList.length && orderList.length > 0"
                  :indeterminate="selectedIds.length > 0 && selectedIds.length < orderList.length"
                  @update:checked="handleSelectAll"
                />
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[150px]"
                :style="{ width: columnWidths.orderNo + 'px' }"
                @mousedown="startResize('orderNo', $event)"
              >
                订单编号
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[120px]"
                :style="{ width: columnWidths.customerName + 'px' }"
                @mousedown="startResize('customerName', $event)"
              >
                客户名称
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.contactName + 'px' }"
                @mousedown="startResize('contactName', $event)"
              >
                联系人
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.totalAmount + 'px' }"
                @mousedown="startResize('totalAmount', $event)"
              >
                订单金额
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.status + 'px' }"
                @mousedown="startResize('status', $event)"
              >
                订单状态
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[100px]"
                :style="{ width: columnWidths.payStatus + 'px' }"
                @mousedown="startResize('payStatus', $event)"
              >
                支付状态
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[120px]"
                :style="{ width: columnWidths.createdAt + 'px' }"
                @mousedown="startResize('createdAt', $event)"
              >
                下单时间
              </th>
              <th 
                class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 cursor-col-resize min-w-[120px]"
                :style="{ width: columnWidths.updatedAt + 'px' }"
                @mousedown="startResize('updatedAt', $event)"
              >
                更新时间
              </th>
              <th class="py-3 px-4 text-left text-sm font-medium text-gray-600 dark:text-gray-400 w-48 sticky right-0 bg-gray-50 dark:bg-gray-700 z-10">
                操作
              </th>
            </tr>
          </thead>
          <tbody>
            <template v-if="loading">
              <tr>
                <td colspan="11" class="py-12 text-center">
                  <NSpin size="large" />
                </td>
              </tr>
            </template>
            <template v-else-if="orderList.length === 0">
              <tr>
                <td colspan="11" class="py-12 text-center text-gray-500">
                  <Archive class="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>暂无订单数据</p>
                </td>
              </tr>
            </template>
            <tr 
              v-for="order in orderList" 
              :key="order.id" 
              class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <td class="py-3 px-4">
                <NCheckbox 
                  :checked="selectedIds.includes(order.id)" 
                  @update:checked="(checked) => handleSelect(order.id, checked)" 
                />
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200 font-mono" :style="{ width: columnWidths.orderNo + 'px' }">
                {{ order.orderNo }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.customerName + 'px' }">
                {{ order.customerName || '未知客户' }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.contactName + 'px' }">
                {{ order.contactName || '-' }}
              </td>
              <td class="py-3 px-4 text-sm font-medium text-gray-800 dark:text-gray-200" :style="{ width: columnWidths.totalAmount + 'px' }">
                ¥{{ order.totalAmount.toLocaleString() }}
              </td>
              <td class="py-3 px-4" :style="{ width: columnWidths.status + 'px' }">
                <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs">
                  {{ getStatusText(order.status) }}
                </span>
              </td>
              <td class="py-3 px-4" :style="{ width: columnWidths.payStatus + 'px' }">
                <span :class="getPayStatusClass(order.payStatus)" class="px-2 py-1 rounded-full text-xs">
                  {{ getPayStatusText(order.payStatus) }}
                </span>
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400" :style="{ width: columnWidths.createdAt + 'px' }">
                {{ formatDate(order.createdAt) }}
              </td>
              <td class="py-3 px-4 text-sm text-gray-600 dark:text-gray-400" :style="{ width: columnWidths.updatedAt + 'px' }">
                {{ formatDate(order.updatedAt) }}
              </td>
              <td class="py-3 px-4 sticky right-0 bg-white dark:bg-gray-800 z-10">
                <div class="flex gap-2">
                  <NButton size="small" type="primary" @click="handleView(order)">
                    <Eye class="w-4 h-4 mr-1" />
                    查看详情
                  </NButton>
                  <NButton size="small" type="warning" @click="handleEdit(order)">
                    <Pencil class="w-4 h-4 mr-1" />
                    编辑
                  </NButton>
                  <NPopconfirm title="确定要删除该订单吗？">
                    <template #trigger>
                      <NButton size="small" type="error" @click="handleDelete(order.id)">
                        <Trash class="w-4 h-4" />
                      </NButton>
                    </template>
                  </NPopconfirm>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span class="text-sm text-gray-500">
          共 {{ pagination.total }} 条记录
        </span>
        <NPagination
          v-model:page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :show-size-picker="true"
          :page-sizes="[10, 20, 50, 100]"
          @update:page="handlePageChange"
          @update:page-size="handlePageSizeChange"
        />
      </div>
    </div>

    <NModal v-model:show="showCreateModal" preset="card" title="新建订单" style="width: 700px;">
      <NForm :model="createForm" label-placement="left" label-width="100px">
        <NFormItem label="客户名称" required>
          <NSelect
            v-model:value="createForm.customerId"
            :options="customerSelectOptions"
            placeholder="选择或搜索客户"
            filterable
            clearable
            @update:value="handleCustomerSelect"
          />
        </NFormItem>
        <div class="grid grid-cols-2 gap-4">
          <NFormItem label="联系人">
            <NInput v-model:value="createForm.contactName" placeholder="请输入联系人" />
          </NFormItem>
          <NFormItem label="联系电话">
            <NInput v-model:value="createForm.phone" placeholder="请输入联系电话" />
          </NFormItem>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <NFormItem label="邮箱">
            <NInput v-model:value="createForm.email" placeholder="请输入邮箱" />
          </NFormItem>
          <NFormItem label="支付方式">
            <NSelect v-model:value="createForm.paymentMethod" placeholder="请选择支付方式" :options="paymentMethodOptions" />
          </NFormItem>
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-gray-700 font-medium">订单商品</span>
            <NButton size="small" @click="handleAddProduct" type="primary">
              <Add class="w-4 h-4 mr-1" />
              添加商品
            </NButton>
          </div>

          <div v-if="createForm.items.length === 0" class="p-4 text-center text-gray-500 border border-dashed border-gray-300 rounded-lg">
            暂无商品，请点击"添加商品"按钮添加
          </div>

          <div v-else class="border border-gray-200 rounded-lg overflow-hidden">
            <table class="w-full text-sm">
              <thead class="bg-gray-50">
                <tr>
                  <th class="py-2 px-3 text-left">商品名称</th>
                  <th class="py-2 px-3 text-left">项目号</th>
                  <th class="py-2 px-3 text-left">料号</th>
                  <th class="py-2 px-3 text-left">牌号</th>
                  <th class="py-2 px-3 text-right">单价</th>
                  <th class="py-2 px-3 text-center">数量</th>
                  <th class="py-2 px-3 text-right">小计</th>
                  <th class="py-2 px-3 text-center">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in createForm.items" :key="index" class="border-t border-gray-100">
                  <td class="py-2 px-3">{{ item.productName }}</td>
                  <td class="py-2 px-3 text-xs">{{ item.projectCodeName || '-' }}</td>
                  <td class="py-2 px-3 text-xs">{{ item.materialCodeName || '-' }}</td>
                  <td class="py-2 px-3 text-xs">{{ item.brandCodeName || '-' }}</td>
                  <td class="py-2 px-3 text-right">¥{{ item.unitPrice.toLocaleString() }}</td>
                  <td class="py-2 px-3 text-center">
                    <NInputNumber v-model:value="item.quantity" :min="1" size="small" class="w-20" />
                  </td>
                  <td class="py-2 px-3 text-right font-medium">¥{{ (item.unitPrice * item.quantity).toLocaleString() }}</td>
                  <td class="py-2 px-3 text-center">
                    <NButton size="small" type="error" @click="handleRemoveProduct(index)">
                      <Trash class="w-4 h-4" />
                    </NButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 p-4 bg-gray-50 rounded-lg">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">商品总金额：</span>
              <span class="text-2xl font-bold text-blue-600">¥{{ calculateTotalAmount().toLocaleString() }}</span>
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-600">优惠金额：</span>
              <NInputNumber v-model:value="createForm.discountAmount" :min="0" :precision="2" size="small" class="w-32" />
            </div>
            <div class="flex justify-between items-center mt-2">
              <span class="text-gray-600 font-medium">应付金额：</span>
              <span class="text-2xl font-bold text-green-600">¥{{ (calculateTotalAmount() - (createForm.discountAmount || 0)).toLocaleString() }}</span>
            </div>
          </div>
        </div>

        <NFormItem label="备注" class="mt-4">
          <NInput v-model:value="createForm.remark" type="textarea" placeholder="请输入订单备注" :rows="2" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showCreateModal = false">取消</NButton>
          <NButton type="primary" @click="handleCreateSubmit">创建</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showProductModal" preset="card" title="选择商品" style="width: 900px;">
      <div class="mb-4">
        <NInput v-model:value="productSearchKeyword" placeholder="搜索商品名称或编码" @keyup.enter="loadProductsForSelection" />
      </div>
      <div class="max-h-80 overflow-y-auto border border-gray-200 rounded-lg">
        <table class="w-full text-sm">
          <thead class="bg-gray-50 sticky top-0">
            <tr>
              <th class="py-2 px-3 text-left">选择</th>
              <th class="py-2 px-3 text-left">商品名称</th>
              <th class="py-2 px-3 text-left">项目号</th>
              <th class="py-2 px-3 text-left">料号</th>
              <th class="py-2 px-3 text-left">牌号</th>
              <th class="py-2 px-3 text-right">价格</th>
              <th class="py-2 px-3 text-right">可售库存</th>
              <th class="py-2 px-3 text-center">数量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in availableProducts" :key="product.id"
                :class="{'opacity-50 cursor-not-allowed': (product.availableStock ?? 0) < 1}"
                class="border-t border-gray-100 hover:bg-gray-50 cursor-pointer"
                @click="(product.availableStock ?? 0) >= 1 && handleSelectProduct(product)">
              <td class="py-2 px-3">
                <NCheckbox :checked="isProductSelected(product.id)" :disabled="(product.availableStock ?? 0) < 1" />
              </td>
              <td class="py-2 px-3">
                {{ product.name }}
                <span v-if="(product.availableStock ?? 0) <= (product.safeStock ?? 5)" class="ml-1 text-xs text-red-500">⚠️</span>
              </td>
              <td class="py-2 px-3 text-xs">{{ product.projectCodeName || '-' }}</td>
              <td class="py-2 px-3 text-xs">{{ product.materialCodeName || '-' }}</td>
              <td class="py-2 px-3 text-xs">{{ product.brandCodeName || '-' }}</td>
              <td class="py-2 px-3 text-right">¥{{ product.price.toLocaleString() }}</td>
              <td class="py-2 px-3 text-right" :class="(product.availableStock ?? 0) <= (product.safeStock ?? 5) ? 'text-red-500' : 'text-gray-500'">
                {{ product.availableStock ?? 0 }}
              </td>
              <td class="py-2 px-3 text-center" @click.stop>
                <NInputNumber v-model:value="product.quantity" :min="1" :max="product.availableStock" size="small" class="w-20" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showProductModal = false">关闭</NButton>
          <NButton type="primary" @click="handleConfirmProductSelection">确定</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showEditModal" preset="card" title="编辑订单" style="width: 600px;">
      <NForm :model="editForm" label-placement="left" label-width="100px">
        <NFormItem label="订单状态">
          <NSelect v-model:value="editForm.status" :options="statusOptions.filter(s => s.value !== '')" placeholder="请选择订单状态" />
        </NFormItem>
        <NFormItem label="支付状态">
          <NSelect v-model:value="editForm.payStatus" :options="payStatusOptions.filter(s => s.value !== '')" placeholder="请选择支付状态" />
        </NFormItem>
        <NFormItem label="支付方式">
          <NSelect v-model:value="editForm.paymentMethod" :options="paymentMethodOptions" placeholder="请选择支付方式" clearable />
        </NFormItem>
        <NFormItem label="实付金额">
          <NInputNumber v-model:value="editForm.paidAmount" :precision="2" :min="0" class="w-full" />
        </NFormItem>
        <NFormItem label="备注">
          <NInput v-model:value="editForm.remark" type="textarea" placeholder="请输入备注" :rows="2" />
        </NFormItem>
      </NForm>
      <template #footer>
        <div class="flex justify-end gap-3">
          <NButton @click="showEditModal = false">取消</NButton>
          <NButton type="primary" @click="handleEditSubmit">保存</NButton>
        </div>
      </template>
    </NModal>

    <NModal v-model:show="showDetailModal" preset="card" title="订单详情" style="width: 800px;" :mask-closable="false">
      <div v-if="detailLoading" class="py-12 text-center">
        <NSpin size="large" />
      </div>
      <template v-else>
        <div class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 class="text-sm font-medium text-gray-500 mb-2">订单信息</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">订单编号</span>
                  <span class="font-mono">{{ detailData.orderNo }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">订单状态</span>
                  <span :class="getStatusClass(detailData.status)" class="px-2 py-0.5 rounded-full text-xs">
                    {{ getStatusText(detailData.status) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">支付状态</span>
                  <span :class="getPayStatusClass(detailData.payStatus)" class="px-2 py-0.5 rounded-full text-xs">
                    {{ getPayStatusText(detailData.payStatus) }}
                  </span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">下单时间</span>
                  <span>{{ detailData.createdAt }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">更新时间</span>
                  <span>{{ detailData.updatedAt }}</span>
                </div>
              </div>
            </div>
            <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h4 class="text-sm font-medium text-gray-500 mb-2">客户信息</h4>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500">客户名称</span>
                  <span>{{ detailData.customerName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">联系人</span>
                  <span>{{ detailData.contactName }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">联系电话</span>
                  <span>{{ detailData.phone || '-' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500">客户邮箱</span>
                  <span>{{ detailData.email || '-' }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500 mb-3">商品列表</h4>
            <table class="w-full">
              <thead>
                <tr class="text-left text-sm">
                  <th class="pb-2 text-gray-500">商品名称</th>
                  <th class="pb-2 text-gray-500">项目号</th>
                  <th class="pb-2 text-gray-500">料号</th>
                  <th class="pb-2 text-gray-500">牌号</th>
                  <th class="pb-2 text-gray-500">单价</th>
                  <th class="pb-2 text-gray-500">数量</th>
                  <th class="pb-2 text-gray-500">小计</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in detailData.items" :key="item.id" class="text-sm">
                  <td class="py-2">{{ item.productName }}</td>
                  <td class="py-2 text-xs">{{ item.projectCodeName || '-' }}</td>
                  <td class="py-2 text-xs">{{ item.materialCodeName || '-' }}</td>
                  <td class="py-2 text-xs">{{ item.brandCodeName || '-' }}</td>
                  <td class="py-2">¥{{ item.unitPrice.toLocaleString() }}</td>
                  <td class="py-2">{{ item.quantity }}</td>
                  <td class="py-2 font-medium">¥{{ item.subtotal.toLocaleString() }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500 mb-3">金额统计</h4>
            <div class="grid grid-cols-3 gap-4">
              <div class="text-center">
                <p class="text-sm text-gray-500 mb-1">商品总金额</p>
                <p class="text-lg font-bold">¥{{ detailData.totalAmount.toLocaleString() }}</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500 mb-1">优惠金额</p>
                <p class="text-lg font-bold text-red-500">-¥{{ (detailData.discountAmount || 0).toLocaleString() }}</p>
              </div>
              <div class="text-center">
                <p class="text-sm text-gray-500 mb-1">实付金额</p>
                <p class="text-xl font-bold text-green-600">¥{{ (detailData.paidAmount || detailData.totalAmount).toLocaleString() }}</p>
              </div>
            </div>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500 mb-2">支付信息</h4>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500">支付方式</span>
                <span>{{ detailData.paymentMethod || '-' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">支付时间</span>
                <span>{{ detailData.paidAt || '-' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500">交易流水号</span>
                <span class="font-mono">{{ detailData.transactionNo || '-' }}</span>
              </div>
            </div>
          </div>

          <div v-if="detailData.remark" class="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <h4 class="text-sm font-medium text-gray-500 mb-2">订单备注</h4>
            <p class="text-sm">{{ detailData.remark }}</p>
          </div>
        </div>
      </template>
      <div class="flex justify-end gap-3 mt-6">
        <NButton @click="showDetailModal = false">关闭</NButton>
      </div>
    </NModal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  NButton,
  NInput,
  NSelect,
  NCheckbox,
  NModal,
  NPopconfirm,
  NSpin,
  NPagination,
  NForm,
  NFormItem,
  NInputNumber
} from 'naive-ui'
import { message } from '@/utils/message'
import { Eye, Trash, Download, Archive, Search, Add, Pencil } from '@vicons/ionicons5'
import {
  getOrders,
  getOrderById,
  deleteOrder,
  batchDeleteOrders,
  createOrder,
  updateOrder
} from '@/api/order'
import { getCustomers } from '@/api/customer'
import type { Order, OrderDetail, OrderItem } from '@/api/order'
import { getProducts } from '@/api/product'
import type { Product } from '@/api/product'
import { useAuthStore } from '@/stores/auth'
import request from '@/api/request'

const route = useRoute()
const authStore = useAuthStore()
const showCreateModal = ref(false)
const showEditModal = ref(false)
const createForm = reactive({
  customerId: null as number | null,
  customerName: '',
  contactName: '',
  phone: '',
  email: '',
  paymentMethod: '',
  discountAmount: 0,
  remark: '',
  items: [] as any[]
})

const editForm = reactive({
  id: null as number | null,
  status: '',
  payStatus: '',
  paymentMethod: '',
  paidAmount: 0,
  remark: ''
})

const showProductModal = ref(false)
const productSearchKeyword = ref('')
const availableProducts = ref<Product[]>([])
const selectedProductIds = ref<number[]>([])
const customerSelectOptions = ref<{ label: string; value: number }[]>([])
const allCustomers = ref<{ id: number; name: string; contactName?: string; phone?: string; email?: string }[]>([])

const paymentMethodOptions = [
  { label: '微信支付', value: 'wechat' },
  { label: '支付宝', value: 'alipay' },
  { label: '银行转账', value: 'bank' },
  { label: '现金', value: 'cash' },
  { label: '其他', value: 'other' }
]

const calculateTotalAmount = () => {
  return createForm.items.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0)
}

const handleCustomerSelect = async (customerId: number) => {
  if (!customerId) {
    createForm.customerName = ''
    createForm.contactName = ''
    createForm.phone = ''
    createForm.email = ''
    return
  }
  const customer = allCustomers.value.find(c => c.id === customerId)
  if (customer) {
    createForm.customerId = customer.id
    createForm.customerName = customer.name
    createForm.contactName = ''
    createForm.phone = ''
    createForm.email = ''
    try {
      const res: any = await request.get('/contacts', {
        params: { customerId, pageNum: 1, pageSize: 10 }
      })
      console.log('联系人数据:', res)
      const contacts = res?.list || []
      if (contacts.length > 0) {
        const firstContact = contacts[0]
        createForm.contactName = firstContact.name || ''
        createForm.phone = firstContact.phone || ''
        createForm.email = firstContact.email || ''
        console.log('填充联系人:', firstContact)
      } else {
        console.log('没有找到联系人')
      }
    } catch (e) {
      console.error('加载联系人失败', e)
    }
  }
}

const loadCustomersForSelection = async () => {
  try {
    const data: any = await getCustomers({ page: 1, pageSize: 500, listType: 'my' })
    allCustomers.value = (data.list || []).map((c: any) => ({
      id: c.id,
      name: c.name,
      contactName: c.contactName,
      phone: c.phone,
      email: c.email
    }))
    customerSelectOptions.value = allCustomers.value.map(c => ({
      label: c.name,
      value: c.id
    }))
  } catch (error) {
    console.error('加载客户列表失败', error)
  }
}

const handleAddProduct = async () => {
  selectedProductIds.value = createForm.items.map(item => item.productId).filter(id => id) as number[]
  await loadProductsForSelection()
  showProductModal.value = true
}

const loadProductsForSelection = async () => {
  try {
    const data: any = await getProducts({ page: 1, pageSize: 100, keyword: productSearchKeyword.value || undefined })
    availableProducts.value = (data.list || []).map((p: any) => ({
      ...p,
      quantity: p.quantity || 1
    }))
  } catch (error) {
    message.error('加载商品失败')
  }
}

const isProductSelected = (productId: number) => {
  return selectedProductIds.value.includes(productId)
}

const handleSelectProduct = (product: Product) => {
  const index = selectedProductIds.value.indexOf(product.id)
  if (index > -1) {
    selectedProductIds.value.splice(index, 1)
  } else {
    selectedProductIds.value.push(product.id)
  }
}

const handleConfirmProductSelection = () => {
  const existingItems = createForm.items
  createForm.items = availableProducts.value
    .filter(p => selectedProductIds.value.includes(p.id))
    .map(p => {
      const existing = existingItems.find(item => item.productId === p.id)
      return {
        productId: p.id,
        productName: p.name,
        productCode: p.code,
        projectCodeId: p.projectCodeId,
        projectCodeName: p.projectCodeName,
        materialCodeId: p.materialCodeId,
        materialCodeName: p.materialCodeName,
        brandCodeId: p.brandCodeId,
        brandCodeName: p.brandCodeName,
        unitPrice: p.price,
        quantity: existing ? existing.quantity : (p.quantity || 1)
      }
    })
  showProductModal.value = false
}

const handleRemoveProduct = (index: number) => {
  createForm.items.splice(index, 1)
}

const handleCreate = () => {
  createForm.items = []
  createForm.discountAmount = 0
  createForm.paymentMethod = ''
  createForm.remark = ''
  createForm.customerId = null
  createForm.customerName = ''
  createForm.contactName = ''
  createForm.phone = ''
  createForm.email = ''
  loadCustomersForSelection()
  showCreateModal.value = true
}

const handleCreateSubmit = async () => {
  if (!createForm.customerId) {
    message.error('请选择客户')
    return
  }
  if (createForm.items.length === 0) {
    message.error('请添加订单商品')
    return
  }

  try {
    await createOrder({
      customerId: createForm.customerId,
      customerName: createForm.customerName,
      contactName: createForm.contactName,
      phone: createForm.phone,
      email: createForm.email,
      paymentMethod: createForm.paymentMethod,
      discountAmount: createForm.discountAmount,
      remark: createForm.remark,
      items: createForm.items
    })
    message.success('创建成功')
    showCreateModal.value = false
    loadOrders()
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || '创建失败'
    message.error(message)
  }
}

const searchKeyword = ref('')
const statusFilter = ref('')
const payStatusFilter = ref('')
const loading = ref(false)
const detailLoading = ref(false)
const orderList = ref<Order[]>([])
const selectedIds = ref<number[]>([])
const showDetailModal = ref(false)
const detailData = reactive<OrderDetail>({
  id: 0,
  orderNo: '',
  customerId: 0,
  customerName: '',
  contactName: '',
  phone: '',
  email: '',
  totalAmount: 0,
  discountAmount: 0,
  paidAmount: 0,
  status: '',
  payStatus: '',
  paymentMethod: '',
  paidAt: '',
  transactionNo: '',
  remark: '',
  createdAt: '',
  updatedAt: '',
  items: []
})

const columnWidths = reactive({
  orderNo: 150,
  customerName: 150,
  contactName: 120,
  totalAmount: 120,
  status: 100,
  payStatus: 100,
  createdAt: 140,
  updatedAt: 140
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const statusOptions = [
  { label: '全部订单状态', value: '' },
  { label: '待付款', value: 'pending' },
  { label: '已付款', value: 'paid' },
  { label: '已完成', value: 'completed' },
  { label: '已取消', value: 'cancelled' }
]

const payStatusOptions = [
  { label: '全部支付状态', value: '' },
  { label: '未支付', value: 'unpaid' },
  { label: '已支付', value: 'paid' },
  { label: '退款中', value: 'refunding' },
  { label: '已退款', value: 'refunded' }
]

const statusMap: Record<string, { label: string; class: string }> = {
  'pending': { label: '待付款', class: 'bg-orange-100 text-orange-700' },
  'paid': { label: '已付款', class: 'bg-blue-100 text-blue-700' },
  'completed': { label: '已完成', class: 'bg-green-100 text-green-700' },
  'cancelled': { label: '已取消', class: 'bg-gray-100 text-gray-700' }
}

const payStatusMap: Record<string, { label: string; class: string }> = {
  'unpaid': { label: '未支付', class: 'bg-orange-100 text-orange-700' },
  'paid': { label: '已支付', class: 'bg-green-100 text-green-700' },
  'refunding': { label: '退款中', class: 'bg-red-100 text-red-700' },
  'refunded': { label: '已退款', class: 'bg-red-100 text-red-700' }
}

const getStatusText = (status: string) => {
  return statusMap[status]?.label || status
}

const getStatusClass = (status: string) => {
  return statusMap[status]?.class || 'bg-gray-100 text-gray-700'
}

const getPayStatusText = (payStatus: string) => {
  return payStatusMap[payStatus]?.label || payStatus
}

const getPayStatusClass = (payStatus: string) => {
  return payStatusMap[payStatus]?.class || 'bg-gray-100 text-gray-700'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return '-'
  return dateStr.replace('T', ' ').substring(0, 19)
}

const handleSearch = () => {
  pagination.page = 1
  loadOrders()
}

const handleReset = () => {
  searchKeyword.value = ''
  statusFilter.value = ''
  payStatusFilter.value = ''
  pagination.page = 1
  loadOrders()
}

const handleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedIds.value = orderList.value.map(order => order.id)
  } else {
    selectedIds.value = []
  }
}

const handleSelect = (id: number, checked: boolean) => {
  const index = selectedIds.value.indexOf(id)
  if (checked && index === -1) {
    selectedIds.value.push(id)
  } else if (!checked && index !== -1) {
    selectedIds.value.splice(index, 1)
  }
}

const handlePageChange = (page: number) => {
  pagination.page = page
  loadOrders()
}

const handlePageSizeChange = (pageSize: number) => {
  pagination.pageSize = pageSize
  pagination.page = 1
  loadOrders()
}

const handleView = async (order: Order) => {
  detailLoading.value = true
  showDetailModal.value = true
  try {
    const data = await getOrderById(order.id)
    Object.assign(detailData, data)
  } catch (error) {
    console.error('加载订单详情失败', error)
    message.error('加载订单详情失败')
    showDetailModal.value = false
  } finally {
    detailLoading.value = false
  }
}

const handleEdit = (order: Order) => {
  editForm.id = order.id
  editForm.status = order.status || ''
  editForm.payStatus = order.payStatus || ''
  editForm.paymentMethod = order.paymentMethod || ''
  editForm.paidAmount = order.paidAmount || 0
  editForm.remark = order.remark || ''
  showEditModal.value = true
}

const handleEditSubmit = async () => {
  if (!editForm.id) {
    message.error('订单ID不存在')
    return
  }
  try {
    await updateOrder(editForm.id, {
      status: editForm.status,
      payStatus: editForm.payStatus,
      paymentMethod: editForm.paymentMethod,
      paidAmount: editForm.paidAmount,
      remark: editForm.remark
    })
    message.success('保存成功')
    showEditModal.value = false
    loadOrders()
  } catch (error: any) {
    message.error(error.message || '保存失败')
  }
}

const handleDelete = async (id: number) => {
  try {
    await deleteOrder(id)
    message.success('删除成功')
    loadOrders()
  } catch (error) {
    console.error('删除订单失败', error)
    message.error('删除订单失败')
  }
}

const handleBatchDelete = async () => {
  if (selectedIds.value.length === 0) {
    message.warning('请选择要删除的订单')
    return
  }
  try {
    await batchDeleteOrders(selectedIds.value)
    message.success('批量删除成功')
    selectedIds.value = []
    loadOrders()
  } catch (error) {
    console.error('批量删除订单失败', error)
    message.error('批量删除订单失败')
  }
}

const handleExport = async () => {
  try {
    const authStore = useAuthStore()
    const params: Record<string, any> = {}
    if (searchKeyword.value) params.keyword = searchKeyword.value
    if (statusFilter.value) params.status = statusFilter.value
    if (payStatusFilter.value) params.payStatus = payStatusFilter.value

    const response = await axios.get('http://localhost:8888/api/orders/export', {
      params,
      headers: {
        Authorization: `Bearer ${authStore.token}`
      },
      responseType: 'blob'
    })

    const blob = new Blob([response.data], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `orders_${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    message.success('导出成功')
  } catch (error) {
    console.error('导出订单失败', error)
    message.error('导出订单失败')
  }
}

const loadOrders = async () => {
  loading.value = true
  console.log('loadOrders called, filters:', {
    page: pagination.page,
    keyword: searchKeyword.value,
    status: statusFilter.value,
    payStatus: payStatusFilter.value
  })
  try {
    const response = await getOrders({
      pageNum: pagination.page,
      pageSize: pagination.pageSize,
      keyword: searchKeyword.value || undefined,
      status: statusFilter.value || undefined,
      payStatus: payStatusFilter.value || undefined
    })
    console.log('Orders response:', response)
    orderList.value = response.list
    pagination.total = response.total
    selectedIds.value = []
  } catch (error) {
    console.error('加载订单列表失败', error)
    orderList.value = mockOrders
    pagination.total = 120
  } finally {
    loading.value = false
  }
}

const mockOrders: Order[] = [
  { id: 1, orderNo: 'ORD20240115001', customerId: 1, customerName: '北京科技有限公司', contactName: '张先生', phone: '13800138001', email: 'zhang@example.com', totalAmount: 12800, discountAmount: 500, paidAmount: 12300, status: 'completed', payStatus: 'paid', paymentMethod: '支付宝', paidAt: '2024-01-15 10:30:00', transactionNo: '202401152837465', remark: '企业版年度套餐', createdAt: '2024-01-15T10:20:00', updatedAt: '2024-01-15T14:00:00', items: [] },
  { id: 2, orderNo: 'ORD20240114002', customerId: 2, customerName: '上海贸易集团', contactName: '李女士', phone: '13900139002', email: 'li@example.com', totalAmount: 8600, discountAmount: 0, paidAmount: 8600, status: 'completed', payStatus: 'paid', paymentMethod: '银行转账', paidAt: '2024-01-14 15:45:00', transactionNo: 'TR20240114782635', remark: '', createdAt: '2024-01-14T14:30:00', updatedAt: '2024-01-14T16:00:00', items: [] },
  { id: 3, orderNo: 'ORD20240113003', customerId: 3, customerName: '广州制造公司', contactName: '王经理', phone: '13700137003', email: 'wang@example.com', totalAmount: 3200, discountAmount: 200, paidAmount: 3000, status: 'paid', payStatus: 'paid', paymentMethod: '微信支付', paidAt: '2024-01-13 09:20:00', transactionNo: 'WX20240113987654', remark: '季度套餐', createdAt: '2024-01-13T09:00:00', updatedAt: '2024-01-13T09:30:00', items: [] },
  { id: 4, orderNo: 'ORD20240112004', customerId: 4, customerName: '深圳科技有限公司', contactName: '陈总', phone: '13600136004', email: 'chen@example.com', totalAmount: 12800, discountAmount: 0, paidAmount: 0, status: 'pending', payStatus: 'unpaid', paymentMethod: '', paidAt: '', transactionNo: '', remark: '等待财务审批', createdAt: '2024-01-12T16:45:00', updatedAt: '2024-01-12T16:45:00', items: [] },
  { id: 5, orderNo: 'ORD20240111005', customerId: 5, customerName: '杭州互联网公司', contactName: '赵主管', phone: '13500135005', email: 'zhao@example.com', totalAmount: 8600, discountAmount: 0, paidAmount: 8600, status: 'cancelled', payStatus: 'refunded', paymentMethod: '支付宝', paidAt: '2024-01-11 11:00:00', transactionNo: '202401119876543', remark: '客户取消订单', createdAt: '2024-01-11T10:30:00', updatedAt: '2024-01-11T14:00:00', items: [] },
  { id: 6, orderNo: 'ORD20240110006', customerId: 1, customerName: '北京科技有限公司', contactName: '张先生', phone: '13800138001', email: 'zhang@example.com', totalAmount: 5800, discountAmount: 300, paidAmount: 5500, status: 'paid', payStatus: 'paid', paymentMethod: '微信支付', paidAt: '2024-01-10 14:20:00', transactionNo: 'WX20240110567890', remark: '追加购买', createdAt: '2024-01-10T14:00:00', updatedAt: '2024-01-10T14:30:00', items: [] },
  { id: 7, orderNo: 'ORD20240109007', customerId: 6, customerName: '成都软件公司', contactName: '刘经理', phone: '13400134006', email: 'liu@example.com', totalAmount: 15800, discountAmount: 800, paidAmount: 15000, status: 'completed', payStatus: 'paid', paymentMethod: '银行转账', paidAt: '2024-01-09 16:00:00', transactionNo: 'TR20240109123456', remark: '企业版升级', createdAt: '2024-01-09T15:30:00', updatedAt: '2024-01-09T17:00:00', items: [] },
  { id: 8, orderNo: 'ORD20240108008', customerId: 7, customerName: '武汉制造业集团', contactName: '孙总', phone: '13300133007', email: 'sun@example.com', totalAmount: 26800, discountAmount: 1800, paidAmount: 25000, status: 'pending', payStatus: 'unpaid', paymentMethod: '', paidAt: '', transactionNo: '', remark: '年度采购计划', createdAt: '2024-01-08T09:00:00', updatedAt: '2024-01-08T09:00:00', items: [] }
]

let resizeColumn = ''
let startX = 0
let startWidth = 0

const startResize = (column: string, event: MouseEvent) => {
  resizeColumn = column
  startX = event.clientX
  startWidth = columnWidths[column as keyof typeof columnWidths]
  document.addEventListener('mousemove', onResize)
  document.addEventListener('mouseup', stopResize)
}

const onResize = (event: MouseEvent) => {
  if (!resizeColumn) return
  const deltaX = event.clientX - startX
  const newWidth = Math.max(80, startWidth + deltaX)
  columnWidths[resizeColumn as keyof typeof columnWidths] = newWidth
}

const stopResize = () => {
  resizeColumn = ''
  document.removeEventListener('mousemove', onResize)
  document.removeEventListener('mouseup', stopResize)
}

onMounted(() => {
  if (route.query.filter === 'mine') {
    searchKeyword.value = ''
  }
  loadOrders()
})
</script>