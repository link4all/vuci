#
# Copyright (C) 2017 Jianhui Zhao <jianhuizhao329@gmail.com>
# Copyright (C) 2015-2016 Jo-Philipp Wich <jow@openwrt.org>
#
# This is free software, licensed under the GNU General Public License v3.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=vuci-app-demo
PKG_RELEASE:=1
PKG_MAINTAINER:=Jianhui Zhao <jianhuizhao329@gmail.com>

PKG_LICENSE:=GPL-3.0

include $(INCLUDE_DIR)/package.mk

define Package/vuci-app-demo
  SECTION:=vuci
  CATEGORY:=VUCI
  SUBMENU:=Applications
  TITLE:=A demo for VUCI Application
  DEPENDS:=+vuci-ui-base
endef

define Package/vuci-app-demo/description
 A demo for VUCI Application.
endef

define Build/Prepare
	$(INSTALL_DIR) $(PKG_BUILD_DIR)
	$(CP) ./view $(PKG_BUILD_DIR)/../vuci-ui-base/src/apps/demo
endef

define Build/Compile
	rm $(PKG_BUILD_DIR)/../vuci-ui-base/.configured_*
	$(MAKE) -C $(TOPDIR) package/feeds/vuci/vuci-ui-base/compile
endef

define Package/vuci-app-demo/install
	$(INSTALL_DIR) $(1)/www/static/js $(1)/usr/share/vuci
	$(CP) $(PKG_BUILD_DIR)/../vuci-ui-base/.tmp/apps/demo.*.js $(1)/www/static/js
	$(CP) ./share/* $(1)/usr/share/vuci
endef

$(eval $(call BuildPackage,vuci-app-demo))
