import { PluginFunction, PluginObject } from 'vue/types/plugin';
import { Vue as _Vue } from 'vue/types/vue';

export * from './controls';
import * as controls from './controls';

export * from './components';
import * as components from './components';

const install: PluginFunction<any> = function(Vue, options = {}) {
  Object.entries(controls).map(([name, control]) => {
    Vue.component(name, control);
  });

  Object.entries(components).map(([name, component]) => {
    Vue.component(name, component);
  });
};

if (typeof window !== undefined && (window as any).Vue) {
  (window as any).Vue.use({ install });
}

const VoidUI: PluginObject<any> = {
  install,
};

export default VoidUI;
