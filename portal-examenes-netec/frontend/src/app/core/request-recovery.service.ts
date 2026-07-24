import {Injectable} from '@angular/core';

interface RecoveryEnvelope {
  createdAt: number;
  payload: unknown;
}

@Injectable({providedIn: 'root'})
export class RequestRecoveryService {
  private readonly key = 'netec.request-recovery';
  private readonly ttlMs = 15 * 60 * 1000;
  private provider?: () => unknown;

  register(provider: () => unknown): void {
    this.provider = provider;
  }

  unregister(): void {
    this.provider = undefined;
  }

  capture(): void {
    if (!this.provider) return;
    const envelope: RecoveryEnvelope = {createdAt: Date.now(), payload: this.provider()};
    sessionStorage.setItem(this.key, JSON.stringify(envelope));
  }

  consume<T>(): T | null {
    const raw = sessionStorage.getItem(this.key);
    sessionStorage.removeItem(this.key);
    if (!raw) return null;
    try {
      const envelope = JSON.parse(raw) as RecoveryEnvelope;
      return Date.now() - envelope.createdAt <= this.ttlMs ? envelope.payload as T : null;
    } catch {
      return null;
    }
  }

  clear(): void {
    sessionStorage.removeItem(this.key);
  }
}
