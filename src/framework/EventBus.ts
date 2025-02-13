export default class EventBus {

    private listeners: {[event: string]: Array<(...args:any[])=>void>};

    constructor() {
      this.listeners = {};
    }
  
    public on(event: string, callback:(...args:any[])=>void ): void {
      if (!this.listeners[event]) {
        this.listeners[event] = [];
      }
  
      this.listeners[event].push(callback);
    }
  
    public off(event: string, callback:(...args:any[])=>void ): void {
          if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
  
      this.listeners[event] = this.listeners[event].filter(
        listener => listener !== callback
      );
    }
  
    public emit(event: string, ...args: any[]): void {
      if (!this.listeners[event]) {
        throw new Error(`Нет события: ${event}`);
      }
      
      this.listeners[event].forEach(function(listener) {
        listener(...args);
      });
    }
  }
