import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import { ApiError } from "@/lib/api";
import { signupOwner } from "@/lib/owner-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { signUpSchema, type SignUpFormData } from "./schema";

export default function SignUpFormFields() {
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      terms: false,
    },
    mode: "onTouched",
  });

  const handleFormSubmit = async (data: SignUpFormData) => {
    setFormError("");
    try {
      await signupOwner({
        fullName: data.fullName,
        email: data.email,
        phone: data.phone || undefined,
        password: data.password,
      });
      navigate("/dashboard");
    } catch (err) {
      setFormError(
        err instanceof ApiError ? err.message : "Inscription impossible",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="space-y-4"
      noValidate
    >
      <div className="rounded-2xl bg-[var(--kree-blue-soft)] px-4 py-3 ring-1 ring-[var(--kree-blue)]/10">
        <p className="text-sm font-semibold text-[var(--kree-blue)]">
          Compte propriétaire uniquement
        </p>
        <p className="mt-0.5 text-xs text-[var(--kree-muted)]">
          Les locataires n’ont pas besoin de compte — ils contactent via WhatsApp
          ou envoient une demande de réservation.
        </p>
      </div>

      <Field data-invalid={Boolean(errors.fullName)}>
        <FieldLabel className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
          Nom complet
        </FieldLabel>
        <Input
          {...register("fullName")}
          type="text"
          autoComplete="name"
          placeholder="Amira Ben Salah"
          aria-invalid={errors.fullName ? "true" : undefined}
          className="h-12 rounded-2xl border-0 bg-[var(--kree-blue-soft)] px-4 text-[var(--kree-ink)] shadow-none ring-1 ring-[var(--kree-blue)]/10 focus-visible:ring-2 focus-visible:ring-[var(--kree-blue)]/35"
        />
        <FieldError errors={[errors.fullName]} />
      </Field>

      <Field data-invalid={Boolean(errors.email)}>
        <FieldLabel className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
          E-mail
        </FieldLabel>
        <Input
          {...register("email")}
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.tn"
          aria-invalid={errors.email ? "true" : undefined}
          className="h-12 rounded-2xl border-0 bg-[var(--kree-blue-soft)] px-4 text-[var(--kree-ink)] shadow-none ring-1 ring-[var(--kree-blue)]/10 focus-visible:ring-2 focus-visible:ring-[var(--kree-blue)]/35"
        />
        <FieldError errors={[errors.email]} />
      </Field>

      <Field data-invalid={Boolean(errors.phone)}>
        <FieldLabel className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
          WhatsApp{" "}
          <span className="font-normal text-[var(--kree-muted)]">(recommandé)</span>
        </FieldLabel>
        <div className="flex h-12 overflow-hidden rounded-2xl bg-[var(--kree-blue-soft)] ring-1 ring-[var(--kree-blue)]/10 focus-within:ring-2 focus-within:ring-[var(--kree-blue)]/35">
          <span className="flex items-center border-r border-[var(--kree-blue)]/10 px-3 text-sm font-semibold text-[var(--kree-blue)]">
            +216
          </span>
          <Input
            {...register("phone")}
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="20 123 456"
            aria-invalid={errors.phone ? "true" : undefined}
            className="h-full flex-1 rounded-none border-0 bg-transparent px-3 shadow-none focus-visible:ring-0"
          />
        </div>
        <FieldError errors={[errors.phone]} />
      </Field>

      <Field data-invalid={Boolean(errors.password)}>
        <FieldLabel className="mb-1.5 block text-sm font-semibold text-[var(--kree-ink)]">
          Mot de passe
        </FieldLabel>
        <InputGroup className="h-12 overflow-hidden rounded-2xl bg-[var(--kree-blue-soft)] ring-1 ring-[var(--kree-blue)]/10 has-[[data-slot=input-group-control]:focus-visible]:ring-2 has-[[data-slot=input-group-control]:focus-visible]:ring-[var(--kree-blue)]/35">
          <InputGroupInput
            {...register("password")}
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Au moins 8 caractères"
            aria-invalid={errors.password ? "true" : undefined}
            className="border-0 bg-transparent shadow-none focus-visible:ring-0"
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton
              type="button"
              size="icon-xs"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Masquer" : "Afficher"}
              className="text-[var(--kree-muted)]"
            >
              {showPassword ? (
                <EyeIcon className="text-current" />
              ) : (
                <EyeCloseIcon className="text-current" />
              )}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
        <FieldError errors={[errors.password]} />
      </Field>

      <div
        className="flex items-start gap-3"
        data-invalid={Boolean(errors.terms) || undefined}
      >
        <Controller
          control={control}
          name="terms"
          render={({ field }) => (
            <Checkbox
              id="terms"
              className="mt-1 shrink-0"
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              aria-invalid={errors.terms ? "true" : undefined}
            />
          )}
        />
        <div className="min-w-0 flex-1">
          <label
            htmlFor="terms"
            className="block cursor-pointer text-sm leading-relaxed text-[var(--kree-muted)]"
          >
            J&apos;accepte les{" "}
            <Link
              to="/contact"
              className="font-semibold text-[var(--kree-blue)] underline-offset-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              conditions d&apos;utilisation
            </Link>{" "}
            et la{" "}
            <Link
              to="/contact"
              className="font-semibold text-[var(--kree-blue)] underline-offset-2 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              politique de confidentialité
            </Link>
            .
          </label>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-500">{errors.terms.message}</p>
          )}
        </div>
      </div>

      {formError && (
        <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-1 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-[var(--kree-orange)] text-sm font-semibold text-white shadow-lg shadow-[var(--kree-orange)]/25 transition hover:brightness-105 disabled:opacity-60"
      >
        {isSubmitting ? "Création…" : "Créer mon espace propriétaire"}
      </button>
    </form>
  );
}
