<template>
  <v-app>
    <v-navigation-drawer ref="nav" expand-on-hover clipped permanent app>
      <v-list subheader>
        <v-list-group>
          <template v-slot:activator>
            <v-list-item id="nav-user-list-item">
              <v-list-item-avatar>
                <v-img :src="!user.image ? defaultImage : user.image"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title class="title">{{
                  user.name
                }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item v-for="userItem in userItems" :key="userItem.text" link>
            <v-list-item-icon>
              <v-icon :size="userItem.icon.size">{{
                userItem.icon.code
              }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ userItem.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <v-divider></v-divider>

        <v-list-item v-for="item in navItems" :key="item.text" link>
          <v-list-item-icon>
            <v-icon :size="item.icon.size">{{ item.icon.code }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark clipped-left flat app>
      <v-toolbar-title class="ml-0 pl-4"
        ><span>MyMovieList</span></v-toolbar-title
      >
      <v-text-field
        flat
        solo-inverted
        hide-details
        label="Search"
        class="hidden-xs-only nav-search-field"
      ></v-text-field>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    defaultImage:
      'https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png',
    user: {
      name: 'Renkee',
      email: 'rene@renkee.eu',
      image:
        'https://avatars0.githubusercontent.com/u/9366854?s=460&u=1db396607010e12ed52eae2ad75384fad9ae8391&v=4'
    },
    userItems: [
      { text: 'Profile', icon: { code: 'fas fa-user-circle', size: '23' } },
      { text: 'My List', icon: { code: 'fas fa-list', size: '19' } },
      { text: 'Friends', icon: { code: 'fas fa-users', size: '18' } },
      { text: 'Sign Out', icon: { code: 'fas fa-sign-out', size: '21' } }
    ],
    navItems: [
      { text: 'Dashboard', icon: { code: 'fas fa-home', size: '19' } },
      { text: 'Top Movies', icon: { code: 'fas fa-award', size: '21' } }
    ]
  })
}
</script>
<style lang="scss" scoped>
.v-list-item__icon .v-icon {
  margin: 0 auto;
}
#nav-user-list-item {
  height: 66px;

  .v-avatar {
    $shift_amount: 8px;
    $base_padding: 16px;

    margin-left: (-$shift_amount) - $base_padding;
    margin-right: $base_padding + $shift_amount;
  }
}
.nav-search-field {
  max-width: 600px;
}
.v-toolbar__title {
  width: 300px;
}
</style>
