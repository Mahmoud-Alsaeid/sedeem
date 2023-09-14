<script setup lang="ts">
import { Class, ClassResponse } from '@/@types/ClassResonse'
import { Student, StudentsResponse } from '@/@types/StudentResponse'
import axiosIns from '@/plugins/axios'


const searchStatus = ref('')
const selectedBranch = ref('')
const selectedClass = ref('')
const rowPerPage = ref(10)
const currentPage = ref(1)
const totalPage = ref(1)
const totalStudents = ref(0)
const classes = ref <Class[]>([]);
const selectedRows = ref<string[]>([])
const students = ref<Student[]>([])

// 👉 Fetch Invoices
watchEffect(async () => {
    const rowPerPageValue = rowPerPage.value;
    const currentPageValue = currentPage.value;
    const searchStatusValue = searchStatus.value
    const selectedBranchValue = selectedBranch.value
    const selectedClassValue = selectedClass.value
    const {data: studentsResponse} = await axiosIns.get<StudentsResponse>(`/student?limit=${rowPerPageValue}&page=${currentPageValue}&status=${searchStatusValue}&branchId=${selectedBranchValue}&classId=${selectedClassValue}`);
    totalPage.value = studentsResponse.totalPages;
    students.value = studentsResponse.docs;
    
    
})
watchEffect(async () => {
    const {data} = await axiosIns.get<ClassResponse>('/class');
    classes.value = data.docs;
    
})

// 👉 watching current page
watchEffect(() => {
  if (currentPage.value > totalPage.value)
    currentPage.value = totalPage.value
})

// 👉 Computing pagination data
const paginationData = computed(() => {
  const firstIndex = students.value.length ? ((currentPage.value - 1) * rowPerPage.value) + 1 : 0
  const lastIndex = students.value.length + ((currentPage.value - 1) * rowPerPage.value)

  return `Showing ${firstIndex} to ${lastIndex} of ${totalStudents.value} entries`
})

</script>

<template>
  <VCard
    v-if="students"
    id="invoice-list"
  >
    <VCardText class="d-flex align-center flex-wrap gap-3">
      <!-- 👉 Rows per page -->
      <div
        class="me-2"
        style="width: 5rem;"
      >
        <VSelect
          v-model="rowPerPage"
          variant="outlined"
          :items="[10, 20, 30, 50]"
        />
      </div>

      <VSpacer />

      <div class="d-flex align-center flex-wrap gap-3">
        <!-- 👉 Search  -->
        <div class="invoice-list-search">
          <VTextField
            v-model="searchStatus"
            placeholder="Search Status"
            density="compact"
            class="me-3"
          />
        </div>

        <div class="invoice-list-status">
            <VSelect
              v-model="selectedClass"
              label="Select Class"
              clearable
              clear-icon="tabler-x"
              density="compact"
              item-title="name"
              item-value="id"
              :items="classes"
            />
          </div>
        <div class="invoice-list-status">
          <VSelect
            v-model="selectedBranch"
            label="Select Branch"
            clearable
            clear-icon="tabler-x"
            item-title="name"
              item-value="id"
            density="compact"
            :items="classes.find(e => e.id === selectedClass)?.branches"
          />
        </div>
      </div>
    </VCardText>

    <VDivider />
    <!-- SECTION Table -->
    <VTable class="text-no-wrap invoice-list-table">
      <!-- 👉 Table head -->
      <thead>
        <tr>
          <th scope="col">
            #username
          </th>
          <th scope="col">
            <VIcon icon="mdi-shield-lock-outline" />
          </th>
          <th scope="col">
            User
          </th>
          <th scope="col">
            TOTAL
          </th>
          <th scope="col">
            JOIN DATE
          </th>
          <th scope="col">
            Phone
          </th>
          
        </tr>
      </thead>

      <!-- 👉 Table Body -->
      <tbody>
        <tr
          v-for="student in students"
          :key="student.id"
        >
          <!-- 👉 Id -->
          <td>
            
            {{ student.username }}
            
          </td>

          <!-- 👉 Trending -->
          <td>
            <VTooltip>
              <template #activator="{ props }">
                <VAvatar
                  :size="30"
                  v-bind="props"
                  color="info"
                  variant="tonal"
                >
                </VAvatar>
              </template>
              <p class="mb-0">
                password: {{ student.password }}
              </p>
              <p class="mb-0">
                Parent: {{ student.parentUsername }}
              </p>
              <p class="mb-0">
                Parrent Password: {{ student.parentPassword }}
              </p>
            </VTooltip>
          </td>

          <!-- 👉 Client Avatar and Email -->
          <td>
            <div class="d-flex align-center">
              <VAvatar
                size="33"
                variant="tonal"
                color="info"
                class="me-3"
              >
                <VImg
                  v-if="student.image"
                  :src="student.image"
                />
              </VAvatar>
              <div class="d-flex flex-column">
                <h6 class="text-sm font-weight-medium mb-0">
                  {{ student.name }}
                </h6>

              </div>
            </div>
          </td>

          <!-- 👉 total -->
          <td>${{ student.installment }}</td>

          <!-- 👉 Date -->
          <td>{{ student.joinDate }}</td>

          <!-- 👉 Balance -->
          <td>
            {{ student.phone  }}
          </td>

          
        </tr>
      </tbody>

      <!-- 👉 table footer  -->
      <tfoot v-show="!students.length">
        <tr>
          <td
            colspan="8"
            class="text-center text-body-1"
          >
            No data available
          </td>
        </tr>
      </tfoot>
    </VTable>
    <!-- !SECTION -->

    <VDivider />

    <!-- SECTION Pagination -->
    <VCardText class="d-flex align-center flex-wrap justify-space-between gap-4 py-4">
      <!-- 👉  Pagination meta -->
      <span class="text-sm text-disabled">{{ paginationData }}</span>

      <!-- 👉 Pagination -->
      <VPagination
        v-model="currentPage"
        size="small"
        :total-visible="5"
        :length="totalPage"
        @next="selectedRows = []"
        @prev="selectedRows = []"
      />
    </VCardText>
  <!-- !SECTION -->
  </VCard>
</template>

<style lang="scss">
#invoice-list {
  .invoice-list-status {
    inline-size: 15rem;
  }

  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>
