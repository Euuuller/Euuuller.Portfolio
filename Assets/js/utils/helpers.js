/**
 * Helper Functions
 * Common utility functions
 */

export class Helpers {
  /**
   * Check if value is defined
   * @param {*} value - Value to check
   * @returns {boolean} True if value is defined
   */
  static isDefined(value) {
    return typeof value !== 'undefined' && value !== undefined;
  }

  /**
   * Check if value is null
   * @param {*} value - Value to check
   * @returns {boolean} True if value is null
   */
  static isNull(value) {
    return value === null;
  }

  /**
   * Check if value is undefined
   * @param {*} value - Value to check
   * @returns {boolean} True if value is undefined
   */
  static isUndefined(value) {
    return typeof value === 'undefined' || value === undefined;
  }

  /**
   * Check if value is empty
   * @param {*} value - Value to check
   * @returns {boolean} True if value is empty
   */
  static isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === 'string') return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === 'object') return Object.keys(value).length === 0;
    return false;
  }

  /**
   * Check if value is a string
   * @param {*} value - Value to check
   * @returns {boolean} True if value is a string
   */
  static isString(value) {
    return typeof value === 'string' || value instanceof String;
  }

  /**
   * Check if value is a number
   * @param {*} value - Value to check
   * @returns {boolean} True if value is a number
   */
  static isNumber(value) {
    return typeof value === 'number' && !isNaN(value);
  }

  /**
   * Check if value is an array
   * @param {*} value - Value to check
   * @returns {boolean} True if value is an array
   */
  static isArray(value) {
    return Array.isArray(value);
  }

  /**
   * Check if value is an object
   * @param {*} value - Value to check
   * @returns {boolean} True if value is an object
   */
  static isObject(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
  }

  /**
   * Deep clone an object
   * @param {*} obj - Object to clone
   * @returns {*} Cloned object
   */
  static deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map(item => this.deepClone(item));
    if (typeof obj === 'object') {
      const clonedObj = {};
      for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  }

  /**
   * Merge objects deeply
   * @param {...Object} objects - Objects to merge
   * @returns {Object} Merged object
   */
  static deepMerge(...objects) {
    const isObject = (obj) => obj && typeof obj === 'object' && !Array.isArray(obj);
    
    return objects.reduce((prev, obj) => {
      Object.keys(obj).forEach(key => {
        const pVal = prev[key];
        const oVal = obj[key];
        
        if (isObject(pVal) && isObject(oVal)) {
          prev[key] = this.deepMerge(pVal, oVal);
        } else {
          prev[key] = oVal;
        }
      });
      
      return prev;
    }, {});
  }

  /**
   * Format bytes to human readable format
   * @param {number} bytes - Bytes to format
   * @param {number} decimals - Decimal places
   * @returns {string} Formatted string
   */
  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  /**
   * Generate a random ID
   * @param {number} length - Length of the ID
   * @returns {string} Random ID
   */
  static generateId(length = 16) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Capitalize first letter of string
   * @param {string} str - String to capitalize
   * @returns {string} Capitalized string
   */
  static capitalize(str) {
    if (!this.isString(str) || str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  /**
   * Convert kebab-case to camelCase
   * @param {string} str - String to convert
   * @returns {string} Converted string
   */
  static kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
  }

  /**
   * Convert camelCase to kebab-case
   * @param {string} str - String to convert
   * @returns {string} Converted string
   */
  static camelToKebab(str) {
    return str.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
  }

  /**
   * Get current timestamp
   * @returns {number} Timestamp
   */
  static timestamp() {
    return Date.now();
  }

  /**
   * Format date to string
   * @param {Date} date - Date to format
   * @param {string} format - Format string
   * @returns {string} Formatted date string
   */
  static formatDate(date, format = 'YYYY-MM-DD HH:mm:ss') {
    const d = new Date(date);
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
      .replace('YYYY', year)
      .replace('MM', month)
      .replace('DD', day)
      .replace('HH', hours)
      .replace('mm', minutes)
      .replace('ss', seconds);
  }

  /**
   * Debounce a function (alias for EventUtils.debounce)
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Whether to trigger immediately
   * @returns {Function} Debounced function
   */
  static debounce(func, wait, immediate = false) {
    return EventUtils.debounce(func, wait, immediate);
  }

  /**
   * Throttle a function (alias for EventUtils.throttle)
   * @param {Function} func - Function to throttle
   * @param {number} limit - Throttle limit in milliseconds
   * @returns {Function} Throttled function
   */
  static throttle(func, limit) {
    return EventUtils.throttle(func, limit);
  }

  /**
   * Sleep for specified time
   * @param {number} ms - Time in milliseconds
   * @returns {Promise} Promise that resolves after specified time
   */
  static sleep(ms) {
    return EventUtils.wait(ms);
  }

  /**
   * Check if running in browser
   * @returns {boolean} True if running in browser
   */
  static isBrowser() {
    return typeof window !== 'undefined' && typeof document !== 'undefined';
  }

  /**
   * Check if running in Node.js
   * @returns {boolean} True if running in Node.js
   */
  static isNode() {
    return typeof process !== 'undefined' && process.versions && process.versions.node;
  }

  /**
   * Get URL parameters
   * @param {string} url - URL to parse
   * @returns {Object} URL parameters
   */
  static getUrlParams(url = window.location.search) {
    const params = {};
    const parser = document.createElement('a');
    parser.href = url;
    const query = parser.search.substring(1);
    const vars = query.split('&');
    
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    
    return params;
  }

  /**
   * Sanitize HTML
   * @param {string} html - HTML to sanitize
   * @returns {string} Sanitized HTML
   */
  static sanitizeHtml(html) {
    const temp = document.createElement('div');
    temp.textContent = html;
    return temp.innerHTML;
  }

  /**
   * Pluralize a word based on count
   * @param {number} count - Count
   * @param {string} singular - Singular form
   * @param {string} plural - Plural form
   * @returns {string} Pluralized word
   */
  static pluralize(count, singular, plural) {
    return count === 1 ? singular : plural || `${singular}s`;
  }
}