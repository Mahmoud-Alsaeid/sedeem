<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'

const vuetifyTheme = useTheme()

const series = [
  {
    name: 'Earning',
    data: [15, 10, 20, 8, 12, 18, 12, 5],
  },
  {
    name: 'Expense',
    data: [-7, -10, -7, -12, -6, -9, -5, -8],
  },
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors

  return {
    chart: {
      parentHeightOffset: 0,
      stacked: true,
      type: 'bar',
      toolbar: { show: false },
    },
    tooltip: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '18%',
        borderRadius: 5,
        startingShape: 'rounded',
        endingShape: 'rounded',
      },
    },
    colors: [currentTheme.primary, currentTheme.secondary],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
      padding: {
        top: -40,
        bottom: -20,
        left: -10,
        right: -2,
      },
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    responsive: [
      {
        breakpoint: 1468,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '22%',
            },
          },
        },
      },
      {
        breakpoint: 1197,
        options: {
          chart: {
            height: 228,
          },
          plotOptions: {
            bar: {
              borderRadius: 8,
              columnWidth: '26%',
            },
          },
        },
      },
      {
        breakpoint: 783,
        options: {
          chart: {
            height: 232,
          },
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '28%',
            },
          },
        },
      },
      {
        breakpoint: 589,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '16%',
            },
          },
        },
      },
      {
        breakpoint: 520,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 6,
              columnWidth: '18%',
            },
          },
        },
      },
      {
        breakpoint: 426,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 5,
              columnWidth: '20%',
            },
          },
        },
      },
      {
        breakpoint: 381,
        options: {
          plotOptions: {
            bar: {
              columnWidth: '24%',
            },
          },
        },
      },
    ],
    states: {
      hover: {
        filter: {
          type: 'none',
        },
      },
      active: {
        filter: {
          type: 'none',
        },
      },
    },
  }
})

const totalEarnings = [
  {
    avatar: 'tabler-currency-dollar',
    avatarColor: 'primary',
    title: 'Total Sales',
    subtitle: 'Total Sales',
    earning: '+$98',
  },
  {
    avatar: 'tabler-brand-paypal',
    avatarColor: 'secondary',
    title: 'Total Revenue',
    subtitle: 'Client Payment',
    earning: '+$126',
  },
]
</script>

<template>
  <VCard>
    <VCardItem class="pb-0">
      <VCardTitle>Total Earning</VCardTitle>

      <div class="d-flex align-center mt-2">
        <h4 class="text-4xl font-weight-semibold me-2">
          87%
        </h4>
        <div class="text-success">
          <VIcon
            size="18"
            icon="tabler-chevron-up"
          />
          <span class="text-base">25.8%</span>
        </div>
      </div>

      <template #append>
        <div class="mt-n10 me-n2">
          <VBtn
            icon
            size="x-small"
            variant="plain"
            color="default"
          >
            <VIcon
              size="22"
              icon="tabler-dots-vertical"
            />
            <VMenu activator="parent">
              <VList>
                <VListItem
                  v-for="(item, index) in ['View More', 'Delete']"
                  :key="index"
                  :value="index"
                >
                  <VListItemTitle>{{ item }}</VListItemTitle>
                </VListItem>
              </VList>
            </VMenu>
          </VBtn>
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VueApexCharts
        :options="chartOptions"
        :series="series"
        height="210"
        class="my-2"
      />

      <VList class="card-list mt-4">
        <VListItem
          v-for="earning in totalEarnings"
          :key="earning.title"
          :title="earning.title"
          :subtitle="earning.subtitle"
        >
          <template #prepend>
            <VAvatar
              :icon="earning.avatar"
              :color="earning.avatarColor"
              variant="tonal"
              size="34"
              rounded
            />
          </template>

          <template #append>
            <span class="text-success">{{ earning.earning }}</span>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 18px;
}
</style>
