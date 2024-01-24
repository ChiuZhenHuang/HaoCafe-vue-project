<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">
          <img src="https://th.bing.com/th/id/OIG.FLGaPpu5qAW67jdLNK.1?w=1024&h=1024&rs=1&pid=ImgDetMain" class="d-block" style="height: 50px;width: 50px;" alt="...">
        </router-link>
        <!-- 手機漢堡鈕 -->
        <button class="navbar-toggler ml-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#sidebar" aria-controls="sidebar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- 桌機導覽列 -->
        <ul  id="navbarNav" class="navbar-nav collapse navbar-collapse">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/shopping">前往購物</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productComponent">管理產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><i class="bi bi-person-gear"></i> 登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart"><i class="bi bi-cart"></i></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- 手機側邊欄 -->
    <div class="offcanvas offcanvas-start" tabindex="-1" id="sidebar" aria-labelledby="sidebarLabel">
      <div class="offcanvas-header">
        <!-- <h5 class="offcanvas-title" id="sidebarLabel">導覽列</h5> -->
        <button type="button" class="btn-close text-reset ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <ul class="navbar-nav flex-column">
          <li class="nav-item">
            <router-link class="nav-link" to="/about">關於我們</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/shopping">前往購物</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard/productComponent">管理產品</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/login"><i class="bi bi-person-gear"></i> 登入</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/user/cart"><i class="bi bi-cart"></i></router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
